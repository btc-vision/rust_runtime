use alloc::alloc::{alloc, Layout};
use alloc::slice;
use alloc::string::String;
use core::ptr::NonNull; // Import format and String from alloc

extern crate alloc;

pub type WaPtr = u32;

pub struct Cursor {
    inner: &'static [u8],
    pos: usize,
}

impl Cursor {
    pub const fn new(inner: &'static [u8]) -> Cursor {
        Cursor { pos: 0, inner }
    }

    pub fn into_inner(self) -> &'static [u8] {
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
    pub fn new(size: usize, id: u32) -> &'static mut WaCell {
        unsafe {
            let layout = WaCell::layout(size);
            let ptr = alloc(layout);
            let cell = NonNull::<WaCell>::new_unchecked(ptr.cast()).as_mut();
            cell.gc_info1 = 0;
            cell.mm_info = ptr as usize;
            cell.rt_id = id;
            cell.rt_size = size as u32;
            cell
        }
    }

    pub fn new_data(id: u32, data: &[u8]) -> &'static mut WaCell {
        let cell = WaCell::new(data.len(), id);
        cell.data_mut().copy_from_slice(data); // Use `copy_from_slice` instead of `write`
        cell
    }

    pub fn from_raw(ptr: WaPtr) -> &'static mut WaCell {
        unsafe { NonNull::<WaCell>::new_unchecked((ptr - WaCell::size()) as *mut WaCell).as_mut() }
    }

    #[inline]
    pub fn ptr(&self) -> WaPtr {
        (self as *const Self as *const u8 as WaPtr) + WaCell::size()
    }

    pub fn data(&self) -> &'static [u8] {
        unsafe { slice::from_raw_parts(self.ptr() as *const u8, self.rt_size as usize) }
    }

    pub fn data_mut(&mut self) -> &'static mut [u8] {
        unsafe { slice::from_raw_parts_mut(self.ptr() as *mut u8, self.rt_size as usize) }
    }

    pub fn cursor(&mut self) -> Cursor {
        Cursor::new(self.data_mut())
    }
}

pub struct WaBuffer {
    buffer: &'static WaCell,
    pointer: &'static WaCell,
}

impl WaBuffer {
    pub fn from_bytes(bytes: &[u8]) -> WaBuffer {
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
    pub fn from_str(s: &str) -> WaBuffer {
        let len = (s.chars().count()) as u16;
        let str_data = len
            .to_le_bytes()
            .iter()
            .chain(s.as_bytes())
            .cloned()
            .collect::<alloc::vec::Vec<u8>>();
        WaBuffer::from_bytes(&str_data)
    }

    pub fn from_raw(ptr: WaPtr) -> WaBuffer {
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

    /*
    Cast memory to given Type.
    It is very unsafe and works only on WASM32 arch due to memory align and type sizes
     */
    #[cfg(target_arch = "wasm32")]
    pub unsafe fn into_type<T: Sized>(&self) -> &'static mut T {
        if core::mem::size_of::<T>() <= self.buffer.rt_size as usize {
            NonNull::new_unchecked(self.buffer.ptr() as *mut T).as_mut()
        } else {
            panic!("Cannot map larger objects");
        }
    }
}
