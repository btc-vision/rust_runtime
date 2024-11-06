#![no_std]
use core::str::FromStr;
use mem::WaPtr;
extern crate alloc;

pub mod blockchain;
pub mod constant;
pub mod contract;
pub mod cursor;
pub mod env;
mod mem;
pub mod prelude;
pub mod utils;

pub use crate::mem::WaBuffer;
// This crate is much more bigger, then expected. Do not use it, if it is not necessary.
pub use ethnum;

pub use contract::{
    op_20::{OP20Params, OP20Trait},
    ContractTrait,
};

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
        let string = WaBuffer::from_str(text).unwrap();
        log(string.ptr());
    }
}
