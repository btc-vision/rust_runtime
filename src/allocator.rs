use core::slice;
use std::{alloc::System, io::Write};

pub struct WaAllocator;

pub struct WaCell {
    /*
       pub mm_info: usize,
       pub gc_info1: usize,
       pub gc_info2: usize,
    */
    pub rt_id: u32,
    pub rt_size: u32,
}

impl WaAllocator {
    fn layout(layout: std::alloc::Layout) -> std::alloc::Layout {
        unsafe {
            std::alloc::Layout::from_size_align_unchecked(
                layout.size() + std::mem::size_of::<WaCell>(),
                layout.align(),
            )
        }
    }
    unsafe fn write_header(ptr: *mut u8, id: u32, size: usize) {
        slice::from_raw_parts_mut(ptr, 4)
            .write(&id.to_le_bytes())
            .unwrap();
        slice::from_raw_parts_mut(ptr.wrapping_add(4), 4)
            .write(&(size as u32).to_le_bytes())
            .unwrap();
    }
}

unsafe impl std::alloc::GlobalAlloc for WaAllocator {
    unsafe fn alloc(&self, layout: std::alloc::Layout) -> *mut u8 {
        let size = layout.size();
        let layout = WaAllocator::layout(layout);
        let ptr = System.alloc(layout);
        WaAllocator::write_header(ptr, 1, size);

        ptr.wrapping_add(std::mem::size_of::<WaCell>())
    }

    unsafe fn alloc_zeroed(&self, layout: std::alloc::Layout) -> *mut u8 {
        let size = layout.size();
        let layout = WaAllocator::layout(layout);
        let ptr = System.alloc_zeroed(layout);
        WaAllocator::write_header(ptr, 1, size);

        ptr.wrapping_add(std::mem::size_of::<WaCell>())
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: std::alloc::Layout) {
        let layout = WaAllocator::layout(layout);
        System.dealloc(ptr.wrapping_sub(std::mem::size_of::<WaCell>()), layout);
    }

    unsafe fn realloc(&self, ptr: *mut u8, layout: std::alloc::Layout, new_size: usize) -> *mut u8 {
        let layout = WaAllocator::layout(layout);
        System
            .realloc(
                ptr.wrapping_sub(std::mem::size_of::<WaCell>()),
                layout,
                new_size + std::mem::size_of::<WaCell>(),
            )
            .wrapping_add(std::mem::size_of::<WaCell>())
    }
}
