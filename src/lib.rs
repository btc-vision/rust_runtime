#![no_std]
use alloc::{format, string::ToString};
use blockchain::transaction;
use mem::{WaBuffer, WaCell, WaPtr};
use utils::ToHex;
extern crate alloc;

#![no_std]
extern crate alloc;

pub mod allocator;
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
pub fn execute(ptr: WaPtr) -> WaPtr {
    let buffer = WaBuffer::from_raw(ptr);
    log_str(&alloc::format!("Execute: {:?}", buffer.data()));
    buffer.to_raw()
}

#[no_mangle]
#[export_name = "setEnvironment"]
pub fn set_environment(ptr: WaPtr) {
    let buffer = WaBuffer::from_raw(ptr);
    log_str(&alloc::format!("Set environment: {:?}", buffer.data()));
    unsafe {
        let environment: &mut crate::blockchain::Environment = buffer.into_type().unwrap();

        log_str(&environment.to_string());
    }
}

#[no_mangle]
#[export_name = "onDeploy"]
pub fn on_deploy(ptr: WaPtr) {
    let buffer = WaBuffer::from_raw(ptr);
    //log_str(&format!("On deploy: {:?}", buffer.data()));
}

#[no_mangle]
#[export_name = "__new"]
pub fn new(size: usize, id: u32) -> WaPtr {
    log_str(&format!("__new: {} {}", size, id));
    WaCell::new(size, id).to_raw()
}

#[no_mangle]
#[export_name = "__pin"]
pub fn pin(ptr: WaPtr) -> WaPtr {
    //let cell = WaCell::from_raw(ptr);
    //log_str(&format!("Pin: {}, {:?}", ptr, cell.data()));
    //WaCell::from_raw(ptr).to_raw()
    ptr
}

#[no_mangle]
#[export_name = "__unpin"]
pub fn unpin(ptr: WaPtr) {
    //let cell = WaCell::from_raw(ptr);
    //log_str(&format!("Unpin: {}, {:?}", ptr, cell.data()));
}
