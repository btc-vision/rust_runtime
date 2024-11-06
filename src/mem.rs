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
        let result = u32::from_le_bytes(self.inner[self.pos..self.pos + 4].try_into().unwrap());
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
        size_of::<Self>() as WaPtr
    }
    const fn usize() -> usize {
        size_of::<Self>()
    }
    const fn layout(size: usize) -> Layout {
        unsafe { Layout::from_size_align_unchecked(size + WaCell::usize(), 1) }
    }
    pub fn new<'a>(size: usize, id: u32) -> &'a mut WaCell {
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

    pub fn from_raw<'a>(ptr: WaPtr) -> &'a mut WaCell {
        unsafe { NonNull::<WaCell>::new_unchecked((ptr - WaCell::size()) as *mut WaCell).as_mut() }
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

    pub fn data<'a>(&self) -> &'a [u8] {
        unsafe { slice::from_raw_parts(self.ptr() as *const u8, self.rt_size as usize) }
    }

    pub fn data_mut(&mut self) -> &mut [u8] {
        unsafe { slice::from_raw_parts_mut(self.ptr() as *mut u8, self.rt_size as usize) }
    }

    pub fn cursor(&mut self) -> Cursor {
        Cursor::new(self.data_mut())
    }
}

pub struct WaBuffer<'a> {
    buffer: &'a mut WaCell,
    pointer: &'a mut WaCell,
}

impl<'a> WaBuffer<'a> {
    pub fn from_str(s: &str) -> WaBuffer<'a> {
        let len = (s.chars().count()) as u16;
        let str_data = len
            .to_le_bytes()
            .iter()
            .chain(s.as_bytes())
            .cloned()
            .collect::<alloc::vec::Vec<u8>>();
        WaBuffer::from_bytes(&str_data)
    }
    pub fn from_bytes(bytes: &[u8]) -> WaBuffer<'a> {
        let buffer = WaCell::new_data(1, bytes);
        let pointer = WaCell::new_data(
            2,
            &[
                buffer.ptr().to_le_bytes(),
                buffer.ptr().to_le_bytes(),
                (bytes.len() as u32).to_le_bytes(),
            ]
            .concat(),
        );
        WaBuffer { pointer, buffer }
    }
    pub fn from_raw(ptr: WaPtr) -> WaBuffer<'a> {
        let pointer = WaCell::from_raw(ptr);
        let mut cursor = pointer.cursor();
        let buffer_ptr = cursor.read_u32();
        let buffer = WaCell::from_raw(buffer_ptr);
        WaBuffer { pointer, buffer }
    }

    pub fn ptr(&self) -> WaPtr {
        self.pointer.ptr()
    }

    pub fn data(&self) -> &[u8] {
        self.buffer.data()
    }

    pub fn to_raw(self) -> WaPtr {
        self.pointer.to_raw()
    }

    pub unsafe fn into_type<T>(&self) -> Result<&'a mut T, alloc::string::String> {
        /*
        super::log_str(&alloc::format!("Data: {:?}", self.cell.data()));
        super::log_str(&self.buffer.ptr().to_string());
        super::log_str(&alloc::format!("Data: {:?}", self.buffer.data()));
         */
        if core::mem::size_of::<T>() <= self.buffer.rt_size as usize {
            #[cfg(feature = "std")]
            println!("Casting memory");

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

/*
pub fn alloc_box_buffer(len: usize) -> Box<[u8]> {
    if len == 0 {
        return <Box<[u8]>>::default();
    }
    let layout = Layout::array::<u8>(len).unwrap();
    let ptr = unsafe { alloc::alloc::alloc(layout) };
    let slice_ptr = core::ptr::slice_from_raw_parts_mut(ptr, len);
    unsafe { Box::from_raw(slice_ptr) }
}
 */
