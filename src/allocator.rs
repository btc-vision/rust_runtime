use core::slice;
use alloc::alloc::{alloc, alloc_zeroed, Layout, GlobalAlloc, dealloc, realloc};

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
    fn layout(layout: Layout) -> Layout {
        unsafe {
            Layout::from_size_align_unchecked(
                layout.size() + size_of::<WaCell>(),
                layout.align(),
            )
        }
    }
    unsafe fn write_header(ptr: *mut u8, id: u32, size: usize) {
        // Write the `id` as little-endian bytes into the first 4 bytes
        slice::from_raw_parts_mut(ptr, 4).copy_from_slice(&id.to_le_bytes());

        // Write the `size` (cast to u32) as little-endian bytes into the next 4 bytes
        slice::from_raw_parts_mut(ptr.add(4), 4).copy_from_slice(&(size as u32).to_le_bytes());
    }
}

unsafe impl GlobalAlloc for WaAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        let size = layout.size();
        let layout = WaAllocator::layout(layout);
        let ptr = alloc(layout);
        WaAllocator::write_header(ptr, 1, size);

        ptr.wrapping_add(size_of::<WaCell>())
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        let layout = WaAllocator::layout(layout);
        dealloc(ptr.wrapping_sub(size_of::<WaCell>()), layout);
    }

    unsafe fn alloc_zeroed(&self, layout: Layout) -> *mut u8 {
        let size = layout.size();
        let layout = WaAllocator::layout(layout);
        let ptr = alloc_zeroed(layout);
        WaAllocator::write_header(ptr, 1, size);

        ptr.wrapping_add(size_of::<WaCell>())
    }

    unsafe fn realloc(&self, ptr: *mut u8, layout: Layout, new_size: usize) -> *mut u8 {
        let layout = WaAllocator::layout(layout);
        realloc(
                ptr.wrapping_sub(size_of::<WaCell>()),
                layout,
                new_size + size_of::<WaCell>(),
            )
            .wrapping_add(size_of::<WaCell>())
    }
}

#[global_allocator]
static GLOBAL: WaAllocator = WaAllocator;
