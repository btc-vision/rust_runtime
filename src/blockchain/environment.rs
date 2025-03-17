use crate::AsWaPtr;
use crate::{AddressHash, BlockHash, TransactionHash};

#[derive(Clone, Copy)]
pub struct Environment {
    pub block_hash: BlockHash,
    pub block_number: u64,
    pub block_median_time: u64,
    pub transaction_hash: TransactionHash,

    pub contract_address: AddressHash,
    pub contract_deployer: AddressHash,
    pub caller: AddressHash,
    pub origin: AddressHash,
}

impl Environment {
    pub fn is_self(&self, address: &AddressHash) -> bool {
        address.eq(&self.contract_address)
    }

    pub fn only_deployer(&self, caller: &AddressHash) -> Result<(), crate::error::Error> {
        if self.contract_deployer.ne(caller) {
            Err(crate::error::Error::Revert("Only owner"))
        } else {
            Ok(())
        }
    }
}

impl AsWaPtr for Environment {
    fn as_wa_ptr(&self) -> u32 {
        self as *const Environment as u32
    }
}

#[allow(dead_code)]
#[cfg(not(target_arch = "wasm32"))]
mod display {
    use crate::utils::ToHex;
    use core::fmt::Display;

    impl Display for super::Environment {
        fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
            f.debug_struct("Environment")
                .field("block_hash", &self.block_hash.to_hex())
                .field("block_number", &self.block_number)
                .field("block_median_time", &self.block_median_time)
                .field("transaction_hash", &self.transaction_hash.to_hex())
                .field("contract_address", &self.contract_address.to_hex())
                .field("contract_deployer", &self.contract_deployer.to_hex())
                .field("caller", &self.caller.to_hex())
                .field("origin", &self.origin.to_hex())
                .finish()
        }
    }
}

#[allow(dead_code)]
#[cfg(not(target_arch = "wasm32"))]
impl Default for Environment {
    fn default() -> Self {
        Environment {
            block_hash: crate::tests::random_block(),
            block_number: crate::tests::random_u64(),
            block_median_time: crate::tests::random_u64(),
            transaction_hash: crate::tests::random_transaction(),
            contract_address: crate::tests::random_address(),
            contract_deployer: crate::tests::random_address(),
            caller: crate::tests::random_address(),
            origin: crate::tests::random_address(),
        }
    }
}
