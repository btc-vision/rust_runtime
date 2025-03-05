#![no_std]
extern crate alloc;

#[allow(unused_imports)]
use alloc::rc::Rc;

#[allow(unused_imports)]
use core::cell::RefCell;

#[allow(unused_imports)]
use rust_runtime::prelude::ContractTrait;
pub mod contract;

#[cfg(target_arch = "wasm32")]
use lol_alloc::LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOCATOR: LeakingPageAllocator = LeakingPageAllocator;

#[cfg(target_arch = "wasm32")]
#[export_name = "start"]
pub unsafe fn start() {
    use rust_runtime::env::global::GlobalContext;
    let context = Rc::new(RefCell::new(GlobalContext::new()));
    rust_runtime::CONTRACT = Some(Rc::new(RefCell::new(crate::contract::Contract::new(
        context,
    ))));
}
