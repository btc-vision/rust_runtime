#![no_std]
extern crate alloc;

#[allow(unused_imports)]
use alloc::rc::Rc;

#[allow(unused_imports)]
use core::cell::RefCell;

#[allow(unused_imports)]
use rust_runtime::prelude::{ContractTrait, WaBuffer, WaPtr};
pub mod contract;

#[cfg(target_arch = "wasm32")]
static mut CONTRACT: spin::Lazy<RefCell<contract::Contract>> = spin::Lazy::new(|| {
    RefCell::new(contract::Contract::new(Rc::new(RefCell::new(
        rust_runtime::env::global::GlobalContext::new(),
    ))))
});

#[cfg(target_arch = "wasm32")]
use lol_alloc::LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOCATOR: LeakingPageAllocator = LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[allow(static_mut_refs)]
#[export_name = "execute"]
pub unsafe fn execute(ptr: WaPtr) -> WaPtr {
    use spin::lazy::Lazy;

    match CONTRACT
        .borrow_mut()
        .execute(WaBuffer::from_raw(ptr).cursor())
    {
        Ok(buffer) => buffer.ptr(),
        Err(err) => {
            CONTRACT.borrow_mut().log(err.as_str());
            panic!("Error occured")
        }
    }
}

#[cfg(target_arch = "wasm32")]
#[export_name = "onDeploy"]
#[allow(static_mut_refs)]
pub unsafe fn on_deploy(ptr: WaPtr) {
    CONTRACT
        .borrow_mut()
        .on_deploy(WaBuffer::from_raw(ptr).cursor());
}

#[cfg(target_arch = "wasm32")]
#[export_name = "setEnvironment"]
#[allow(static_mut_refs)]
pub unsafe fn set_environment(ptr: WaPtr) {
    let buffer = WaBuffer::from_raw(ptr);
    let environment: &mut rust_runtime::blockchain::Environment = buffer.into_type();
    CONTRACT.borrow_mut().set_environment(environment);
}
