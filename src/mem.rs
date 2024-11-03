use core::slice;

use alloc::boxed::Box;
use alloc::vec::Vec;
use core::mem;
use alloc::alloc::{alloc, Layout, dealloc};
use alloc::{format}; // Import format and String from alloc

extern crate alloc;

pub type WaPtr = u32;

static mut MEMORY: Vec<WaPtr> = Vec::new();

pub struct Cursor<'a> {
    inner: &'a [u8],
    pos: usize,
}

impl<'a> Cursor<'a> {
    pub const fn new(inner: &[u8]) -> Cursor {
        Cursor { pos: 0, inner }
    }

    pub fn into_inner(self) -> &'a [u8] {
        self.inner
    }

    pub const fn position(&self) -> usize {
        self.pos
    }

    pub fn read_u32(&mut self) -> u32 {
        let result = u32::from_le_bytes(
            self.inner[self.pos as usize..self.pos + 4]
                .try_into()
                .unwrap(),
        );
        self.pos += 4;
        result
    }
}

pub struct WaCell {
    pub mm_info: usize,
    pub gc_info1: usize,
    pub gc_info2: usize,
    pub rt_id: u32,
    pub rt_size: u32,
}

impl WaCell {
    const fn size() -> WaPtr {
        mem::size_of::<WaCell>() as WaPtr
    }
    const fn usize() -> usize {
        mem::size_of::<WaCell>()
    }
    const fn layout(size: usize) -> Layout {
        unsafe { Layout::from_size_align_unchecked(size + WaCell::usize(), 1) }
    }
    pub fn new(size: usize, id: u32) -> Box<WaCell> {
        unsafe {
            let layout = WaCell::layout(size);
            let ptr = alloc(layout);
            let mut cell = Box::<WaCell>::from_raw(ptr.cast());
            cell.gc_info1 = 0;
            cell.mm_info = ptr as usize;
            cell.rt_id = id;
            cell.rt_size = size as u32;
            cell
        }
    }

    pub fn new_data(id: u32, data: &[u8]) -> Box<WaCell> {
        let mut cell = WaCell::new(data.len(), id);
        cell.data_mut().copy_from_slice(data); // Use `copy_from_slice` instead of `write`
        cell
    }

    pub fn leak(mut self: Box<Self>) {
        self.dec();
        Box::leak(self);
    }

    pub fn drop(mut self: Box<Self>) {
        if self.gc_info1 == 0 {
            let layout = WaCell::layout(self.rt_size as usize);
            unsafe {
                let ptr = self.ptr();
                if let Some(index) = MEMORY.iter().position(|cell_ptr| *cell_ptr == ptr) {
                    MEMORY.remove(index);
                }
                dealloc(Box::into_raw(self) as *mut u8, layout);
            }
        } else {
            self.dec();
        }
    }

    pub fn from_raw(ptr: WaPtr) -> Box<WaCell> {
        unsafe { Box::from_raw((ptr - WaCell::size()) as *mut u8 as *mut WaCell) }
    }

    pub fn to_raw(self: Box<Self>) -> WaPtr {
        (Box::into_raw(self) as *const u8).wrapping_add(WaCell::usize()) as WaPtr
    }

    pub fn inc(&mut self) {
        self.gc_info1 += 1;
    }

    pub fn dec(&mut self) {
        if self.gc_info1 > 1 {
            self.gc_info1 -= 1;
        }
    }

    #[inline]
    pub fn ptr(&self) -> WaPtr {
        (self as *const Self as *const u8 as WaPtr) + WaCell::size()
    }

    pub fn data<'a>(self: &Box<Self>) -> &[u8] {
        unsafe { slice::from_raw_parts(self.ptr() as *const u8, self.rt_size as usize) }
    }

    pub fn data_mut<'a>(self: &mut Box<Self>) -> &mut [u8] {
        unsafe { slice::from_raw_parts_mut(self.ptr() as *mut u8, self.rt_size as usize) }
    }

    pub fn cursor<'a>(self: &mut Box<Self>) -> Cursor {
        Cursor::new(self.data_mut())
    }
}

pub struct WaArray {
    cell: Box<WaCell>,
    buffer: Box<WaCell>,
}

impl WaArray {
    pub fn from_raw(ptr: WaPtr) -> WaArray {
        let mut cell = WaCell::from_raw(ptr);
        cell.inc();
        let mut cursor = cell.cursor();
        let buffer_ptr = cursor.read_u32();
        let mut buffer = WaCell::from_raw(buffer_ptr);
        buffer.inc();
        WaArray { cell, buffer }
    }

    pub fn ptr(&self) -> WaPtr {
        self.cell.ptr()
    }

    pub fn data(&self) -> &[u8] {
        self.buffer.data()
    }

    pub fn to_raw(mut self) -> WaPtr {
        self.buffer.dec();
        self.buffer.to_raw();
        self.cell.dec();
        self.cell.to_raw()
    }

    pub fn leak(self) {
        self.cell.leak();
        self.buffer.leak();
    }

    pub fn drop(self) {
        self.cell.drop();
        self.buffer.drop();
    }
}

pub struct WaString {
    cell: Box<WaCell>,
    buffer: Box<WaCell>,
}
impl WaString {
    pub fn new(text: &str) -> WaString {
        let len = (text.chars().count()) as u16;
        let str_data = len
            .to_le_bytes()
            .iter()
            // Write string itself
            .chain(text.as_bytes())
            .cloned()
            .collect::<alloc::vec::Vec<u8>>();
        let buffer = WaCell::new_data(1, &str_data);
        let cell = WaCell::new_data(
            2,
            &[
                buffer.ptr().to_le_bytes(),
                buffer.ptr().to_le_bytes(),
                (str_data.len() as u32).to_le_bytes(),
            ]
            .concat(),
        );

        WaString { cell, buffer }
    }

    pub fn ptr(&self) -> WaPtr {
        self.cell.ptr()
    }

    pub fn data(&self) -> &[u8] {
        self.buffer.data()
    }

    pub fn to_raw(mut self) -> WaPtr {
        self.buffer.dec();
        self.buffer.to_raw();
        self.cell.dec();
        self.cell.to_raw()
    }

    fn leak(self) {
        self.cell.leak();
        self.buffer.leak();
    }

    fn drop(self) {
        self.cell.drop();
        self.buffer.drop();
    }
}

#[link(wasm_import_module = "env")]
extern "C" {
    pub fn log(buffer: WaPtr);
}

pub fn log_str(text: &str) {
    unsafe {
        let string = WaString::new(text);
        log(string.ptr());
        string.drop();
    }
}

#[no_mangle]
pub fn execute(ptr: WaPtr) -> WaPtr {
    let buffer = WaArray::from_raw(ptr);
    log_str(&alloc::format!("Execute: {:?}", buffer.data()));
    buffer.to_raw()
}

#[no_mangle]
#[export_name = "setEnvironment"]
pub fn set_environment(ptr: WaPtr) {
    let buffer = WaArray::from_raw(ptr);
    log_str(&alloc::format!("Set environment: {:?}", buffer.data()));
    buffer.leak();
}

#[no_mangle]
#[export_name = "onDeploy"]
pub fn on_deploy(ptr: WaPtr) {
    let buffer = WaArray::from_raw(ptr);
    log_str(&format!("On deploy: {:?}", buffer.data()));
    buffer.leak();
}

#[no_mangle]
#[export_name = "__new"]
pub fn new(size: usize, id: u32) -> WaPtr {
    unsafe {
        let cell = WaCell::new(size, id);
        let ptr = cell.to_raw();
        MEMORY.push(ptr);
        ptr
    }
}

#[no_mangle]
#[export_name = "__pin"]
pub fn pin(ptr: WaPtr) -> WaPtr {
    let mut cell = WaCell::from_raw(ptr);
    cell.inc();
    cell.to_raw()
}

#[no_mangle]
#[export_name = "__unpin"]
pub fn unpin(ptr: WaPtr) {
    unsafe {
        let mut cell = WaCell::from_raw(ptr);
        cell.dec();
        cell.to_raw();
        log_str(&alloc::format!("Mem size: {}", MEMORY.len()));
    }
}

/**
 * Remove unused allocations
 */
#[no_mangle]
#[export_name = "__collect"]
pub fn collect() {
    unsafe {
        let mut new = Vec::new();
        for ptr in MEMORY.iter() {
            let cell = WaCell::from_raw(*ptr);
            if cell.gc_info1 > 0 {
                new.push(cell.to_raw());
            }
        }
        MEMORY.clear(); // Clear the old memory
        MEMORY.extend(new); // Update with the new elements
    }
}
