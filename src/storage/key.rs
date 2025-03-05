use crate::WaPtr;

#[derive(Clone, Copy, Eq, PartialEq)]
pub struct StorageKey {
    pub bytes: [u8; crate::constant::STORE_KEY_SIZE],
}

impl StorageKey {
    pub const fn new(bytes: [u8; crate::constant::STORE_KEY_SIZE]) -> Self {
        Self { bytes }
    }
    pub fn mut_ptr(&mut self) -> WaPtr {
        WaPtr(self.bytes.as_mut_ptr() as *mut u8 as u32)
    }

    pub fn ptr(&self) -> WaPtr {
        WaPtr(self.bytes.as_ptr() as *const u8 as u32)
    }
}
