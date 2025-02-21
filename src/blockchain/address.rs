use crate::storage::StorageKey;

#[derive(Clone, Copy, Eq, PartialEq, Debug)]
pub struct AddressHash {
    pub bytes: [u8; crate::constant::ADDRESS_BYTE_LENGTH],
}

impl From<AddressHash> for StorageKey {
    fn from(val: AddressHash) -> Self {
        val.bytes
    }
}

impl crate::utils::ToHex for AddressHash {
    fn get_bytes(&self) -> &[u8] {
        self.bytes.as_ref()
    }
}

impl AddressHash {
    pub const DEAD: AddressHash = AddressHash {
        bytes: [
            40, 74, 228, 172, 219, 50, 169, 155, 163, 235, 250, 102, 169, 29, 219, 65, 167, 183,
            161, 210, 254, 244, 21, 57, 153, 34, 205, 138, 4, 72, 92, 2,
        ],
    };
    pub fn new(bytes: &[u8]) -> Self {
        Self {
            bytes: bytes.try_into().unwrap(),
        }
    }
}
