use crate::utils::{to_hex, ToHex};
use alloc::string::ToString;
use core::fmt::Display;

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

impl Display for Environment {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        f.debug_struct("Environment")
            .field("sender", &self.sender.to_hex())
            .field("origin", &self.origin.to_hex())
            .field("transaction", &to_hex(&self.transaction))
            .field("block_hash", &to_hex(&self.block_hash))
            .field("owner", &self.owner.to_hex())
            .field("address", &self.address.to_hex())
            .field("timestamp", &self.timestamp.to_string())
            .field("safe_rnd", &self.safe_rnd.to_string())
            .finish()
    }
}

impl Environment {}
