use crate::mem::WaBuffer;
use core::str::FromStr;

mod global;
mod sha;

pub use sha::*;

pub fn log(text: &str) {
    unsafe {
        let string = WaBuffer::from_str(text).unwrap();
        global::log(string.ptr());
    }
}

pub fn emit(buffer: WaBuffer) {
    unsafe { global::emit(buffer.ptr()) }
}
