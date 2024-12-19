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
    [0; 32]
}

#[cfg(not(target_arch = "wasm32"))]
pub fn random_u64() -> u64 {
    rand::random()
}

#[cfg(target_arch = "wasm32")]
pub fn random_u64() -> u64 {
    0
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
    contract: &mut impl crate::ContractTrait,
    selector: crate::types::Selector,
) -> Cursor {
    let mut buffer = crate::WaBuffer::new(32, 1).unwrap();
    let mut cursor = buffer.cursor();
    cursor.write_u32_le(&selector).unwrap();
    contract.execute(cursor).unwrap().cursor()
}

pub fn execute_address(
    contract: &mut impl crate::ContractTrait,
    selector: crate::types::Selector,
    address: &AddressHash,
) -> Cursor {
    let mut buffer = crate::WaBuffer::new(64, 1).unwrap();
    let mut cursor = buffer.cursor();
    cursor.write_u32_le(&selector).unwrap();
    cursor.write_address(&address).unwrap();
    contract.execute(cursor).unwrap().cursor()
}

pub fn execute_address_amount(
    contract: &mut impl crate::ContractTrait,
    selector: crate::types::Selector,
    address: &AddressHash,
    amount: u256,
) -> Cursor {
    let mut buffer = crate::WaBuffer::new(96, 1).unwrap();
    let mut cursor = buffer.cursor();
    cursor.write_u32_le(&selector).unwrap();
    cursor.write_address(&address).unwrap();
    cursor.write_u256_be(&amount).unwrap();
    contract.execute(cursor).unwrap().cursor()
}
