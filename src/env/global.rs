#[allow(unused_imports)]
use crate::{
    cursor::Cursor,
    storage::{key::StorageKey, map::Map, value::StorageValue},
    AddressHash, AsWaMutPtr, AsWaPtr, AsWaSize, BlockHash, Environment, FromBytes, Input, Output,
    TransactionHash,
};

use core::cell::RefCell;

#[link(wasm_import_module = "env")]
extern "C" {
    pub fn revert(data: u32, length: u32);

    pub fn exit(status: u32, data: u32, length: u32);

    #[link_name = "calldata"]
    pub fn get_call_data(offset: u32, length: u32, result: u32);

    #[link_name = "environment"]
    pub fn get_environment(offset: u32, length: u32, result: u32);

    pub fn load(key: u32, result: u32);

    pub fn store(key: u32, value: u32);

    #[link_name = "deployFromAddress"]
    pub fn deploy_from_address(origin_address: u32, salt: u32, result_address: u32) -> u32;

    pub fn call(address: u32, call_data: u32, call_data_length: u32, resultLength: u32);

    #[link_name = "callResult"]
    pub fn call_result(offset: u32, length: u32, result: u32);

    pub fn emit(data: u32, data_length: u32);

    #[link_name = "encodeAddress"]
    pub fn encode_address(data: u32) -> u32;

    #[link_name = "validateBitcoinAddress"]
    pub fn validate_bitcoin_address(addres: u32, address_length: u32) -> u32;

    #[link_name = "verifySchnorrSignature"]
    pub fn verify_schnorr_signature(public_key: u32, signature: u32, message: u32) -> u32;

    pub fn sha256(data: u32, data_legth: u32, result: u32);

    pub fn ripemd160(data: u32, data_length: u32, result: u32);

    #[link_name = "inputsSize"]
    pub fn inputs_size() -> u32;

    pub fn inputs(buffer: u32);

    #[link_name = "outputsSize"]
    pub fn outputs_size() -> u32;

    pub fn outputs(buffer: u32);
}

#[link(wasm_import_module = "debug")]
extern "C" {
    pub fn log(ptr: u32, len: u32);
}

pub struct GlobalContext {
    store: RefCell<Map<StorageKey, StorageValue>>,
}

unsafe impl Sync for GlobalContext {}

impl GlobalContext {
    pub const fn new() -> Self {
        Self {
            store: RefCell::new(Map::new()),
        }
    }
}

impl super::Context for GlobalContext {
    fn call_data(&self, size: usize) -> Cursor {
        let mut cursor = crate::cursor::Cursor::new(size);
        unsafe {
            get_call_data(0, size as u32, cursor.as_wa_mut_ptr());
        }
        cursor
    }

    fn environment(&self) -> Environment {
        unsafe {
            let mut cursor = Cursor::new(crate::constant::ENVIRONMENT_BYTE_LENGTH);
            get_environment(
                0,
                crate::constant::ENVIRONMENT_BYTE_LENGTH as u32,
                cursor.as_wa_mut_ptr(),
            );

            Environment {
                block_hash: BlockHash::from_bytes(
                    cursor
                        .read_bytes(crate::constant::BLOCK_HASH_BYTE_LENGTH)
                        .unwrap(),
                ),
                block_number: cursor.read_u64(true).unwrap(),
                block_median_time: cursor.read_u64(true).unwrap(),
                transaction_hash: TransactionHash::from_bytes(
                    cursor
                        .read_bytes(crate::constant::TRANSACTION_HASH_BYTE_LENGTH)
                        .unwrap(),
                ),

                contract_address: cursor.read_address().unwrap(),
                contract_deployer: cursor.read_address().unwrap(),
                caller: cursor.read_address().unwrap(),
                origin: cursor.read_address().unwrap(),
            }
        }
    }

    fn emit(&self, event: &dyn crate::event::EventTrait) {
        unsafe {
            emit(event.as_wa_ptr(), event.as_wa_size());
        }
    }

    fn call(&self, _address: &crate::AddressHash, _data: Cursor) -> Cursor {
        unimplemented!("This method is not implemented")
    }

    fn encode_address(&self, _address: &str) -> &'static [u8] {
        unimplemented!("This method is not implemented")
    }

    fn deploy_from_address(
        &self,
        _from_address: &AddressHash,
        _salt: [u8; 32],
    ) -> Result<AddressHash, crate::error::Error> {
        unimplemented!("This method is not implemented")
    }

    fn validate_bitcoin_address(&self, address: &str) -> Result<bool, crate::error::Error> {
        unsafe {
            Ok(validate_bitcoin_address(
                address.as_bytes().as_ptr() as u32,
                address.as_bytes().len() as u32,
            ) != 0)
        }
    }

    fn verify_schnorr_signature(
        &self,
        address: &AddressHash,
        signature: &[u8],
        hash: &[u8],
    ) -> Result<bool, crate::error::Error> {
        unsafe {
            Ok(verify_schnorr_signature(
                address.as_wa_ptr(),
                signature.as_ptr() as u32,
                hash.as_ptr() as u32,
            ) != 0)
        }
    }

    fn load(&self, pointer: &StorageKey) -> Option<StorageValue> {
        unsafe {
            let value = StorageValue::ZERO;
            let result = self.store.borrow().get(pointer).cloned();
            if let Some(value) = result {
                Some(value)
            } else {
                load(pointer.as_wa_ptr(), value.as_wa_ptr());

                if value.eq(&StorageValue::ZERO) {
                    None
                } else {
                    self.store.borrow_mut().insert(*pointer, value);
                    Some(value)
                }
            }
        }
    }

    fn store(&self, pointer: StorageKey, value: StorageValue) {
        unsafe {
            if if let Some(old) = self.store.borrow().get(&pointer) {
                value.ne(old)
            } else {
                true
            } {
                self.store.borrow_mut().insert(pointer, value);
                store(pointer.as_wa_ptr(), value.as_wa_ptr())
            }
        }
    }

    fn exists(&self, pointer: &StorageKey) -> bool {
        if self.store.borrow().contains_key(pointer) {
            true
        } else {
            self.load(pointer).is_some()
        }
    }

    fn inputs(&self) -> alloc::vec::Vec<Input> {
        unsafe {
            let size = inputs_size();
            let mut buffer = Cursor::new(size as usize);
            inputs(buffer.as_wa_mut_ptr());
            buffer.read_transaction_inputs().unwrap()
        }
    }

    fn outputs(&self) -> alloc::vec::Vec<Output> {
        unsafe {
            let size = outputs_size();
            let mut buffer = Cursor::new(size as usize);
            outputs(buffer.as_wa_mut_ptr());
            buffer.read_transaction_outputs().unwrap()
        }
    }
}
