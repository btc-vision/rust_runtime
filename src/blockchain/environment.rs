use crate::utils::{to_hex, ToHex};
use alloc::string::ToString;
use core::{default, fmt::Display, ops::Add};
use ethnum::U256;

use super::{address, transaction, AddressHash};

pub struct Environment {
    pub sender: super::AddressHash,
    pub origin: super::AddressHash,
    pub transaction_hash: super::TransactionHash,
    pub block_hash: super::BlockHash,
    pub owner: super::AddressHash,
    pub address: super::AddressHash,
    pub timestamp: u64,
    pub safe_rnd: u64,
}

impl Environment {
    pub fn new(
        sender: AddressHash,
        origin: AddressHash,
        transaction_hash: super::TransactionHash,
        block_hash: super::BlockHash,
        owner: AddressHash,
        address: AddressHash,
        timestamp: u64,
        safe_rnd: u64,
    ) -> Self {
        Self {
            sender,
            origin,
            transaction_hash,
            block_hash,
            owner,
            address,
            timestamp,
            safe_rnd,
        }
    }
}

impl Display for Environment {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        f.debug_struct("Environment")
            .field("sender", &self.sender.to_hex())
            .field("origin", &self.origin.to_hex())
            .field("transaction", &to_hex(&self.transaction_hash.bytes))
            .field("block_hash", &to_hex(&self.block_hash.bytes))
            .field("owner", &self.owner.to_hex())
            .field("address", &self.address.to_hex())
            .field("timestamp", &self.timestamp.to_string())
            .field("safe_rnd", &self.safe_rnd.to_string())
            .finish()
    }
}

impl Environment {}
