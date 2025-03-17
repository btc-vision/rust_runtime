use crate::{AsBytes, AsWaPtr, FromBytes};

#[derive(Clone, Copy, Eq, PartialEq)]
#[repr(transparent)]
pub struct StorageKey(pub [u8; crate::constant::STORE_KEY_BYTE_LENGTH]);

impl StorageKey {
    pub const fn new(bytes: [u8; crate::constant::STORE_KEY_BYTE_LENGTH]) -> Self {
        Self(bytes)
    }
}

impl AsBytes for StorageKey {
    fn as_bytes(&self) -> &[u8] {
        &self.0
    }
}

impl AsWaPtr for StorageKey {
    fn as_wa_ptr(&self) -> u32 {
        self.0.as_ptr() as u32
    }
}
impl FromBytes for StorageKey {
    fn from_bytes(bytes: &[u8]) -> Self {
        Self(bytes.try_into().unwrap())
    }
}
