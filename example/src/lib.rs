#![no_std]
extern crate alloc;
use rust_runtime::prelude::{ContractTrait, Cursor, WaBuffer, WaPtr};
mod contract;

static mut CONTRACT: contract::Contract = contract::Contract::new();

#[cfg(target_arch = "wasm32")]
use lol_alloc::LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOCATOR: LeakingPageAllocator = LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[no_mangle]
pub unsafe fn execute(ptr: WaPtr) -> WaPtr {
    let mut cursor = WaBuffer::from_raw(ptr).cursor();
    match CONTRACT.execute(cursor) {
        Ok(buffer) => buffer.ptr(),
        Err(err) => {
            rust_runtime::log(err.as_str());
            WaBuffer::new(0, 1).ptr()
        }
    }
}

#[cfg(target_arch = "wasm32")]
#[no_mangle]
#[export_name = "onDeploy"]
pub unsafe fn on_deploy(ptr: WaPtr) {
    CONTRACT.on_deploy(WaBuffer::from_raw(ptr).cursor());
}

#[cfg(target_arch = "wasm32")]
#[no_mangle]
#[export_name = "setEnvironment"]
pub unsafe fn set_environment(ptr: WaPtr) {
    let buffer = WaBuffer::from_raw(ptr);
    let environment: &mut rust_runtime::blockchain::Environment = buffer.into_type();
    CONTRACT.set_environment(environment);
}
