use crate::U256;

use crate::{AsBytes, AsWaPtr, FromBytes};

#[derive(Copy, Clone, Eq, PartialEq)]
#[repr(transparent)]
pub struct StorageValue(pub [u8; crate::constant::STORE_VALUE_BYTE_LENGTH]);

impl StorageValue {
    pub const ZERO: StorageValue = StorageValue([0; crate::constant::STORE_VALUE_BYTE_LENGTH]);

    pub fn new(bytes: [u8; crate::constant::STORE_VALUE_BYTE_LENGTH]) -> Self {
        Self(bytes)
    }

    pub fn value(&self) -> [u8; crate::constant::STORE_VALUE_BYTE_LENGTH] {
        self.0
    }

    pub fn bool(&self) -> bool {
        self.0.iter().any(|v| 0.ne(v))
    }

    pub fn zero(&self) -> bool {
        self.0.iter().all(|v| 0.eq(v))
    }

    pub fn u8(&self) -> u8 {
        self.0[31]
    }

    pub fn u16(&self) -> u16 {
        u16::from_be_bytes(self.0[30..32].try_into().unwrap())
    }

    pub fn u32(&self) -> u32 {
        u32::from_be_bytes(self.0[28..32].try_into().unwrap())
    }

    pub fn u64(&self) -> u64 {
        u64::from_be_bytes(self.0[24..32].try_into().unwrap())
    }

    pub fn u128(&self) -> u128 {
        u128::from_be_bytes(self.0[16..32].try_into().unwrap())
    }

    pub fn u256(&self) -> U256 {
        U256::from_big_endian(&self.0)
    }
}

impl AsBytes for StorageValue {
    fn as_bytes(&self) -> &[u8] {
        &self.0
    }
}

impl AsWaPtr for StorageValue {
    fn as_wa_ptr(&self) -> u32 {
        self.0.as_ptr() as u32
    }
}

impl FromBytes for StorageValue {
    fn from_bytes(bytes: &[u8]) -> Self {
        let mut inner = [0u8; crate::constant::STORE_VALUE_BYTE_LENGTH];
        let length = bytes.len().min(crate::constant::STORE_VALUE_BYTE_LENGTH);

        inner[32 - length..32].copy_from_slice(&bytes[0..length]);
        StorageValue(inner)
    }
}

impl From<[u8; crate::constant::STORE_VALUE_BYTE_LENGTH]> for StorageValue {
    fn from(value: [u8; crate::constant::STORE_VALUE_BYTE_LENGTH]) -> Self {
        StorageValue(value)
    }
}

impl From<&[u8; crate::constant::STORE_VALUE_BYTE_LENGTH]> for StorageValue {
    fn from(value: &[u8; crate::constant::STORE_VALUE_BYTE_LENGTH]) -> Self {
        StorageValue(*value)
    }
}

impl From<&[u8]> for StorageValue {
    fn from(value: &[u8]) -> Self {
        StorageValue::from_bytes(value)
    }
}

impl From<u8> for StorageValue {
    fn from(value: u8) -> Self {
        From::<&[u8]>::from(&value.to_be_bytes())
    }
}

impl From<u16> for StorageValue {
    fn from(value: u16) -> Self {
        From::<&[u8]>::from(&value.to_be_bytes())
    }
}

impl From<u32> for StorageValue {
    fn from(value: u32) -> Self {
        From::<&[u8]>::from(&value.to_be_bytes())
    }
}

impl From<u64> for StorageValue {
    fn from(value: u64) -> Self {
        From::<&[u8]>::from(&value.to_be_bytes())
    }
}

impl From<u128> for StorageValue {
    fn from(value: u128) -> Self {
        From::<&[u8]>::from(&value.to_be_bytes())
    }
}

impl From<U256> for StorageValue {
    fn from(value: U256) -> Self {
        Self::from(value.to_big_endian())
    }
}

impl From<bool> for StorageValue {
    fn from(value: bool) -> Self {
        From::<u8>::from(value.into())
    }
}

impl From<StorageValue> for u8 {
    fn from(val: StorageValue) -> Self {
        val.u8()
    }
}

impl From<StorageValue> for u16 {
    fn from(val: StorageValue) -> Self {
        val.u16()
    }
}

impl From<StorageValue> for u32 {
    fn from(val: StorageValue) -> Self {
        val.u32()
    }
}

impl From<StorageValue> for u64 {
    fn from(val: StorageValue) -> Self {
        val.u64()
    }
}

impl From<StorageValue> for u128 {
    fn from(val: StorageValue) -> Self {
        val.u128()
    }
}

impl From<StorageValue> for U256 {
    fn from(val: StorageValue) -> Self {
        val.u256()
    }
}

impl From<StorageValue> for bool {
    fn from(val: StorageValue) -> Self {
        val.bool()
    }
}
