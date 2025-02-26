use alloc::vec::Vec;
use ethnum::u256;

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
    pub network: Network,
    pub events: alloc::vec::Vec<crate::event::Event>,
    pub global_store: Map<StorageKey, StorageValue>,
    pub cache_store: Map<StorageKey, StorageValue>,
    pub inputs: alloc::vec::Vec<crate::blockchain::transaction::Input>,
    pub outputs: alloc::vec::Vec<crate::blockchain::transaction::Output>,
}

impl TestContext {
    pub fn new(
        network: Network,
        global_store: Map<StorageKey, StorageValue>,
        inputs: alloc::vec::Vec<crate::blockchain::transaction::Input>,
        outputs: alloc::vec::Vec<crate::blockchain::transaction::Output>,
    ) -> Self {
        Self {
            network,
            events: alloc::vec::Vec::new(),
            global_store: global_store,
            cache_store: Map::new(),
            inputs,
            outputs,
        }
    }
}

impl super::Context for TestContext {
    fn emit(&mut self, event: &dyn crate::event::EventTrait) {
        let event = crate::event::Event::new(event.buffer());
        self.events.push(event);
    }

    fn log(&self, _text: &str) {}

    fn call(&self, buffer: crate::WaBuffer) -> WaBuffer {
        buffer
    }

    fn deploy(&self, buffer: WaBuffer) -> WaBuffer {
        buffer
    }

    fn deploy_from_address(&self, buffer: WaBuffer) -> WaBuffer {
        buffer
    }

    fn encode_address(&self, _address: &str) -> &'static [u8] {
        b"abc"
    }

    fn validate_bitcoin_address(&self, _address: &str) -> bool {
        true
    }

    fn verify_schnorr_signature(&self, _data: &[u8]) -> bool {
        true
    }

    fn load(
        &mut self,
        pointer: &crate::storage::StorageKey,
    ) -> Option<crate::storage::StorageValue> {
        if let Some(value) = self.cache_store.get(pointer) {
            Some(*value)
        } else if let Some(value) = self.global_store.get(pointer) {
            self.cache_store.insert(*pointer, *value);
            Some(*value)
        } else {
            None
        }
        .filter(|&value| !StorageValue::ZERO.eq(&value))
    }

    fn store(&mut self, pointer: crate::storage::StorageKey, value: crate::storage::StorageValue) {
        if if let Some(old) = self.cache_store.get(&pointer) {
            value.ne(old)
        } else {
            true
        } {
            self.cache_store.insert(pointer, value);
            self.global_store.insert(pointer, value);
        }
    }

    fn exists(&mut self, pointer: &StorageKey) -> bool {
        if self.cache_store.contains_key(pointer) {
            true
        } else if let Some(value) = self.global_store.get(pointer) {
            self.cache_store.insert(*pointer, *value);
            true
        } else {
            false
        }
    }

    fn next_pointer_greater_than(
        &self,
        pointer: crate::storage::StorageKey,
    ) -> crate::storage::StorageKey {
        (u256::from_be_bytes(pointer) + 1).to_le_bytes()
    }

    fn inputs(&self) -> Vec<crate::blockchain::transaction::Input> {
        self.inputs.clone()
    }

    fn outputs(&self) -> Vec<crate::blockchain::transaction::Output> {
        self.outputs.clone()
    }
}
