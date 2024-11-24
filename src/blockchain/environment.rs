use crate::utils::{to_hex, ToHex};
use alloc::string::ToString;
use core::{default, fmt::Display, ops::Add};
use ethnum::U256;

use super::{address, transaction, Address};

pub struct Environment {
    pub sender: super::Address,
    pub origin: super::Address,
    pub transaction_hash: super::TransactionHash,
    pub block_hash: super::BlockHash,
    pub owner: super::Address,
    pub address: super::Address,
    pub timestamp: u64,
    pub safe_rnd: u64,
    pointer: u16,
    storage: crate::memory::map::Map<U256, U256>,
}

impl Environment {
    pub fn new(
        sender: Address,
        origin: Address,
        transaction_hash: super::TransactionHash,
        block_hash: super::BlockHash,
        owner: Address,
        address: Address,
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
            pointer: 0,
            storage: crate::memory::map::Map::new(),
        }
    }

    pub fn next_pointer(&mut self) -> u16 {
        self.pointer += 1;
        self.pointer
    }

    pub fn get_storage_at(
        &mut self,
        key: &U256,
        default: U256,
    ) -> Result<bool, crate::error::Error> {
        if self.storage.contains_key(key) {
            return Ok(true);
        }

        let value = crate::env::pointer_load(key)?;
        let result = value != U256::ZERO;
        self.storage.push(key.clone(), value);

        Ok(result)
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
