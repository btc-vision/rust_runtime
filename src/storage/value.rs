use ethnum::u256;

#[derive(Copy, Clone, Eq, PartialEq)]
pub struct StorageValue {
    inner: [u8; crate::constant::STORE_VALUE_SIZE],
}

impl StorageValue {
    pub const ZERO: StorageValue = StorageValue {
        inner: [0; crate::constant::STORE_VALUE_SIZE],
    };

    pub fn from_le_bytes(bytes: [u8; crate::constant::STORE_VALUE_SIZE]) -> Self {
        Self { inner: bytes }
    }
    pub fn value(&self) -> [u8; crate::constant::STORE_VALUE_SIZE] {
        self.inner
    }

    pub fn bytes(&self) -> &[u8] {
        &self.inner
    }

    pub fn bool(&self) -> bool {
        self.inner.iter().any(|v| 0.le(v))
    }

    pub fn zero(&self) -> bool {
        self.inner.iter().all(|v| 0.eq(v))
    }

    pub fn u8(&self) -> u8 {
        self.inner[0]
    }

    pub fn u16(&self) -> u16 {
        u16::from_be_bytes([self.inner[0], self.inner[1]])
    }

    pub fn u32(&self) -> u32 {
        u32::from_be_bytes(self.inner[0..4].try_into().unwrap())
    }

    pub fn u64(&self) -> u64 {
        u64::from_be_bytes(self.inner[0..8].try_into().unwrap())
    }

    pub fn u128(&self) -> u128 {
        u128::from_be_bytes(self.inner[0..16].try_into().unwrap())
    }

    pub fn u256(&self) -> u256 {
        u256::from_be_bytes(self.inner)
    }
}

impl From<[u8; crate::constant::STORE_VALUE_SIZE]> for StorageValue {
    fn from(value: [u8; crate::constant::STORE_VALUE_SIZE]) -> Self {
        StorageValue { inner: value }
    }
}

impl From<&[u8; crate::constant::STORE_VALUE_SIZE]> for StorageValue {
    fn from(value: &[u8; crate::constant::STORE_VALUE_SIZE]) -> Self {
        StorageValue {
            inner: value.clone(),
        }
    }
}

impl From<&[u8]> for StorageValue {
    fn from(value: &[u8]) -> Self {
        let mut inner = [0u8; crate::constant::STORE_VALUE_SIZE];
        for i in 0..value.len().max(crate::constant::STORE_VALUE_SIZE) {
            inner[i] = value[i];
        }
        StorageValue { inner }
    }
}

impl From<u8> for StorageValue {
    fn from(value: u8) -> Self {
        From::<&[u8]>::from(&value.to_le_bytes())
    }
}

impl From<u16> for StorageValue {
    fn from(value: u16) -> Self {
        From::<&[u8]>::from(&value.to_le_bytes())
    }
}

impl From<u32> for StorageValue {
    fn from(value: u32) -> Self {
        From::<&[u8]>::from(&value.to_le_bytes())
    }
}

impl From<u64> for StorageValue {
    fn from(value: u64) -> Self {
        From::<&[u8]>::from(&value.to_le_bytes())
    }
}

impl From<u128> for StorageValue {
    fn from(value: u128) -> Self {
        From::<&[u8]>::from(&value.to_le_bytes())
    }
}

impl From<u256> for StorageValue {
    fn from(value: u256) -> Self {
        Self::from(value.to_le_bytes())
    }
}

impl From<bool> for StorageValue {
    fn from(value: bool) -> Self {
        From::<u8>::from(value.into())
    }
}

impl Into<u8> for StorageValue {
    fn into(self) -> u8 {
        self.u8()
    }
}

impl Into<u16> for StorageValue {
    fn into(self) -> u16 {
        self.u16()
    }
}

impl Into<u32> for StorageValue {
    fn into(self) -> u32 {
        self.u32()
    }
}

impl Into<u64> for StorageValue {
    fn into(self) -> u64 {
        self.u64()
    }
}

impl Into<u128> for StorageValue {
    fn into(self) -> u128 {
        self.u128()
    }
}

impl Into<u256> for StorageValue {
    fn into(self) -> u256 {
        self.u256()
    }
}

impl Into<bool> for StorageValue {
    fn into(self) -> bool {
        self.bool()
    }
}