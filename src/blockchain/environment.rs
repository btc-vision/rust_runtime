use alloc::{format, string::ToString};

use crate::utils::ToHex;

pub struct Environment {
    pub sender: super::Address,
    pub origin: super::Address,
    pub transaction: [u8; crate::constant::TRANSACTION_HASH_LENGTH],
    pub block_hash: [u8; crate::constant::BLOCK_HASH_LENGTH],
    pub owner: super::Address,
    pub address: super::Address,
    pub timestamp: u64,
    pub safe_rnd: u64,
}

impl ToString for Environment {
    fn to_string(&self) -> alloc::string::String {
        format!("Environment\n sender: {}, origin: {}, transaction: {:?}, block_hash: {:?}, owner: {}, address: {}, timestamp: {}, safe_rnd: {}", self.sender.to_hex(), self.origin.to_hex(), self.transaction, self.block_hash, self.owner.to_hex(), self.address.to_hex(), self.timestamp, self.safe_rnd)
    }
}
