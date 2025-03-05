use ethnum::u256;

use crate::{
    blockchain::{AddressHash, BlockHash, Environment, TransactionHash},
    cursor::Cursor,
};

#[cfg(not(target_arch = "wasm32"))]
pub fn random_bytes() -> [u8; 32] {
    let mut result = [0u8; 32];
    result.iter_mut().for_each(|b| *b = rand::random::<u8>());
    result
}

#[cfg(target_arch = "wasm32")]
pub fn random_bytes() -> [u8; 32] {
    static mut value: u8 = 9;
    let mut result = [0u8; 32];
    result.iter_mut().for_each(|b| unsafe {
        value += 13;
        *b = value;
    });
    result
}

#[cfg(not(target_arch = "wasm32"))]
pub fn random_u64() -> u64 {
    rand::random()
}

#[cfg(target_arch = "wasm32")]
pub fn random_u64() -> u64 {
    unsafe {
        static mut value: u64 = 9;
        value += 19;
        value
    }
}

pub fn random_address() -> AddressHash {
    AddressHash {
        bytes: random_bytes(),
    }
}

pub fn random_transaction() -> TransactionHash {
    TransactionHash {
        bytes: random_bytes(),
    }
}

pub fn random_block() -> BlockHash {
    BlockHash {
        bytes: random_bytes(),
    }
}

pub fn random_environment() -> Environment {
    Environment {
        address: random_address(),
        block_hash: random_block(),
        deployer: random_address(),
        sender: random_address(),
        origin: random_address(),
        transaction_hash: random_transaction(),
        timestamp: 0,
        safe_rnd: random_u64(),
    }
}

pub fn execute(
    contract: &mut dyn crate::ContractTrait,
    selector: crate::types::Selector,
) -> Cursor {
    let mut cursor = Cursor::new(32);
    cursor.write_u32_le(&selector).unwrap();
    contract.execute(cursor).unwrap()
}

pub fn execute_address(
    contract: &mut dyn crate::ContractTrait,
    selector: crate::types::Selector,
    address: &AddressHash,
) -> Cursor {
    let mut cursor = Cursor::new(64);
    cursor.write_u32_le(&selector).unwrap();
    cursor.write_address(address).unwrap();
    contract.execute(cursor).unwrap()
}

pub fn execute_address_amount(
    contract: &mut dyn crate::ContractTrait,
    selector: crate::types::Selector,
    address: &AddressHash,
    amount: u256,
) -> Cursor {
    let mut cursor = Cursor::new(96);
    cursor.write_u32_le(&selector).unwrap();
    cursor.write_address(address).unwrap();
    cursor.write_u256_be(&amount).unwrap();
    contract.execute(cursor).unwrap()
}
