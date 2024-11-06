#![no_std]
extern crate alloc;
use rust_runtime::prelude::{ContractTrait, WaBuffer, WaPtr};
mod contract;

static mut CONTRACT: contract::Contract = contract::Contract::new();

#[cfg(target_arch = "wasm32")]
use lol_alloc::LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOCATOR: LeakingPageAllocator = LeakingPageAllocator;

#[no_mangle]
pub unsafe fn execute(ptr: WaPtr) -> WaPtr {
    let buffer = WaBuffer::from_raw(ptr);
    CONTRACT.execute(buffer).ptr()
}

#[no_mangle]
#[export_name = "onDeploy"]
pub unsafe fn on_deploy(ptr: WaPtr) {
    let buffer = WaBuffer::from_raw(ptr);
    CONTRACT.on_deploy(buffer);
}

#[no_mangle]
#[export_name = "setEnvironment"]
pub unsafe fn set_environment(ptr: WaPtr) {
    let buffer = WaBuffer::from_raw(ptr);
    let environment: &mut rust_runtime::blockchain::Environment = buffer.into_type();
    CONTRACT.set_environment(environment);
}
