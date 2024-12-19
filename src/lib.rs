#![no_std]
#![feature(const_for)]
#![feature(const_trait_impl)]
#![feature(stmt_expr_attributes)]
#![feature(str_from_raw_parts)]
extern crate alloc;

pub mod blockchain;
pub mod constant;
pub mod contract;
pub mod cursor;
pub mod env;
pub mod error;
pub mod event;
pub mod math;
mod mem;
pub mod prelude;
pub mod storage;
pub mod types;
pub mod utils;

pub mod tests;

pub use crate::mem::WaBuffer;
pub use env::*;
pub use ethnum;
pub use utils::*;

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
