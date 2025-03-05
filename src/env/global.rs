use alloc::vec::Vec;

use crate::{
    blockchain::{transaction::Input, AddressHash},
    cursor::Cursor,
    storage::{
        key::{self, StorageKey},
        map::Map,
        value::{self, StorageValue},
    },
    WaPtr,
};
use ethnum::u256;

#[link(wasm_import_module = "env")]
extern "C" {
    pub fn revert(data: u32, length: u32);

    #[link_name = "getCalldata"]
    pub fn get_call_data(offset: u32, length: u32, result: WaPtr);

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
    pub fn log(ptr: u32);
}

//#[cfg(target_arch = "wasm32")]
pub struct GlobalContext {
    store: Map<StorageKey, StorageValue>,
    inputs: Option<Vec<crate::blockchain::transaction::Input>>,
    outputs: Option<Vec<crate::blockchain::transaction::Output>>,
}

//#[cfg(target_arch = "wasm32")]
impl GlobalContext {
    pub const fn new() -> Self {
        Self {
            store: Map::new(),
            inputs: None,
            outputs: None,
        }
    }
}

//#[cfg(target_arch = "wasm32")]
impl super::Context for GlobalContext {
    fn get_call_data(&self, size: usize) -> Cursor {
        let cursor = crate::cursor::Cursor::new(size);
        unsafe {
            get_call_data(0, size as u32, cursor.ptr());
        }
        cursor
    }

    fn log(&self, text: &str) {
        unsafe {
            let bytes = text
                .as_bytes()
                .iter()
                .chain(b"\0".iter())
                .cloned()
                .collect::<alloc::vec::Vec<u8>>();
            log(bytes.as_ptr() as u32);
        }
    }

    fn emit(&mut self, event: &dyn crate::event::EventTrait) {
        unsafe {
            emit(event.ptr(), event.buffer().len() as u32);
        }
    }

    fn call(&self, address: &crate::blockchain::AddressHash, data: Cursor) -> Cursor {
        data
    }

    fn encode_address(&self, _address: &str) -> &'static [u8] {
        b"abcd"
    }

    fn deploy_from_address(
        &self,
        from_address: &AddressHash,
        salt: [u8; 32],
    ) -> Result<AddressHash, crate::error::Error> {
        Ok(*from_address)
    }

    fn validate_bitcoin_address(&self, _address: &str) -> bool {
        false
    }

    fn verify_schnorr_signature(&self, _data: &[u8]) -> bool {
        false
    }

    fn load(&mut self, pointer: &StorageKey) -> Option<StorageValue> {
        unsafe {
            let mut value = StorageValue::from_bytes([0; 32]);
            load(pointer.ptr().0, value.ptr().0);

            if value.eq(&StorageValue::ZERO) {
                None
            } else {
                self.store.insert(*pointer, value.clone());
                Some(value)
            }
        }
    }

    fn exists(&mut self, pointer: &StorageKey) -> bool {
        if self.store.contains_key(pointer) {
            true
        } else {
            self.load(pointer).is_some()
        }
    }

    fn store(&mut self, pointer: StorageKey, value: StorageValue) {
        unsafe {
            if if let Some(old) = self.store.get(&pointer) {
                value.ne(old)
            } else {
                false
            } {
                self.store.insert(pointer, value);
                store(pointer.ptr().0, value.ptr().0)
            }
        }
    }

    fn inputs(&mut self) -> alloc::vec::Vec<crate::blockchain::transaction::Input> {
        if let Some(inputs) = &self.inputs {
            inputs.clone()
        } else {
            Vec::new()
        }
    }

    /*
    fn iter_inputs(&mut self) -> impl Iterator<Item = &crate::blockchain::transaction::Input> {
        if self.inputs.is_none() {
            self.inputs = Some(Vec::new());
        }

        self.inputs.as_ref().unwrap().iter()
    }
     */

    fn outputs(&mut self) -> alloc::vec::Vec<crate::blockchain::transaction::Output> {
        if let Some(outputs) = &self.outputs {
            outputs.clone()
        } else {
            Vec::new()
        }
    }

    /*
    fn iter_outputs(&mut self) -> impl Iterator<Item = &crate::blockchain::transaction::Output> {
        if self.outputs.is_none() {
            self.outputs = Some(Vec::new());
        }

        self.outputs.as_ref().unwrap().iter()
    }
     */
}
