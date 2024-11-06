#![no_std]
use mem::{WaBuffer, WaCell, WaPtr};
extern crate alloc;

pub mod blockchain;
pub mod constant;
pub mod contract;
pub mod env;
pub mod mem;
pub mod utils;

#[cfg(not(test))]
#[cfg(not(feature = "std"))]
#[cfg(target_arch = "wasm32")]
#[panic_handler]
fn panic(_panic: &core::panic::PanicInfo<'_>) -> ! {
    core::arch::wasm32::unreachable()
}

#[link(wasm_import_module = "env")]
extern "C" {
    pub fn log(buffer: WaPtr);
}

pub fn log_str(text: &str) {
    unsafe {
        let string = WaBuffer::from_str(text);
        log(string.ptr());
    }
}

#[no_mangle]
#[export_name = "__new"]
pub fn new(size: usize, id: u32) -> WaPtr {
    WaCell::new(size, id).ptr()
}

#[no_mangle]
#[export_name = "__pin"]
pub fn pin(ptr: WaPtr) -> WaPtr {
    ptr
}

#[no_mangle]
#[export_name = "__unpin"]
pub fn unpin(_ptr: WaPtr) {}
