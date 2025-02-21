use libc_print::libc_println;

use crate::{
    storage::map::Map,
    storage::{StorageKey, StorageValue},
    WaBuffer,
};

pub enum Network {
    Mainnet,
    Testnet,
    Preview,
}

pub struct TestContext {
    pub newtork: Network,
    pub events: alloc::vec::Vec<crate::event::Event>,
    pub global_store: Map<StorageKey, StorageValue>,
    pub cache_store: Map<StorageKey, StorageValue>,
    pub inputs: alloc::vec::Vec<crate::blockchain::transaction::Input>,
    pub outputs: alloc::vec::Vec<crate::blockchain::transaction::Output>,
}

impl<'a> super::Context<'a> for TestContext {
    fn emit(&mut self, event: &impl crate::event::EventTrait) {
        let event = crate::event::Event::new(event.buffer());
        self.events.push(event);
    }

    fn log(&self, text: &str) {
        libc_println!("{}", text);
    }

    fn call(&self, buffer: crate::WaBuffer) -> WaBuffer {
        buffer
    }

    fn deploy(&self, buffer: WaBuffer) -> WaBuffer {
        buffer
    }

    fn deploy_from_address(&self, buffer: WaBuffer) -> WaBuffer {
        buffer
    }

    fn encode_address(&self, address: &str) -> &'static [u8] {
        b"abc"
    }

    fn validate_bitcoin_address(&self, address: &str) -> bool {
        true
    }

    fn verify_schnorr_signature(&self, data: &[u8]) -> bool {
        true
    }

    fn load(
        &mut self,
        pointer: &crate::storage::StorageKey,
        default_value: crate::storage::StorageValue,
    ) -> crate::storage::StorageValue {
        if self.cache_store.contains_key(&pointer) {
            *self.cache_store.get(&pointer).unwrap()
        } else {
            match self.global_store.get(&pointer) {
                Some(result) => {
                    if StorageValue::ZERO.eq(result) && default_value != StorageValue::ZERO {
                        self.cache_store.insert(pointer, default_value);
                        default_value
                    } else {
                        self.cache_store.insert(pointer, *result);
                        *result
                    }
                }
                None => default_value,
            }
        }
    }

    fn store(&mut self, pointer: crate::storage::StorageKey, value: crate::storage::StorageValue) {}

    fn exists(&mut self, pointer: &StorageKey) -> bool {
        false
    }

    fn next_pointer_greater_than(
        &self,
        pointer: crate::storage::StorageKey,
    ) -> crate::storage::StorageKey {
        [0; 32].into()
    }

    fn sha256(&self, data: &[u8]) -> &'static [u8] {
        b"ab"
    }

    fn sha256_double(&self, data: &[u8]) -> &'static [u8] {
        b"ab2"
    }

    fn rimemd160(&self, data: &[u8]) -> &'static [u8] {
        b"ab3"
    }

    fn iter_inputs(&self) -> impl Iterator<Item = &crate::blockchain::transaction::Input> {
        self.inputs.iter()
    }

    fn iter_outputs(&self) -> impl Iterator<Item = &crate::blockchain::transaction::Output> {
        self.outputs.iter()
    }
}
