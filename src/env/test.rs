use alloc::vec::Vec;
use core::cell::RefCell;
use libc_print::libc_println;

use crate::{
    env::WrappedMut,
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
    pub events: RefCell<alloc::vec::Vec<crate::event::Event>>,
    pub global_store: RefCell<Map<StorageKey, StorageValue>>,
    pub cache_store: RefCell<Map<StorageKey, StorageValue>>,
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
            events: RefCell::new(alloc::vec::Vec::new()),
            global_store: RefCell::new(global_store),
            cache_store: RefCell::new(Map::new()),
            inputs,
            outputs,
        }
    }
}

impl super::Context for TestContext {
    fn emit(&self, event: &dyn crate::event::EventTrait) {
        let event = crate::event::Event::new(event.buffer());
        unsafe {
            self.events.borrow_mut().push(event);
        }
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

    fn load(&self, pointer: &crate::storage::StorageKey) -> Option<crate::storage::StorageValue> {
        if let Some(value) = if let Some(value) = self.cache_store.borrow().get(&pointer) {
            Some(*value)
        } else {
            if let Some(value) = self.global_store.borrow().get(&pointer) {
                self.cache_store.borrow_mut().insert(*pointer, *value);
                Some(*value)
            } else {
                None
            }
        } {
            if StorageValue::ZERO.eq(&value) {
                None
            } else {
                Some(value)
            }
        } else {
            None
        }
    }

    fn store(&self, pointer: crate::storage::StorageKey, value: crate::storage::StorageValue) {}

    fn exists(&self, pointer: &StorageKey) -> bool {
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

    fn inputs(&self) -> Vec<crate::blockchain::transaction::Input> {
        self.inputs.clone()
    }

    fn outputs(&self) -> Vec<crate::blockchain::transaction::Output> {
        self.outputs.clone()
    }
}
