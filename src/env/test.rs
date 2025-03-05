use core::cell::RefCell;
extern crate std;
use alloc::vec::Vec;
use alloc::{boxed::Box, rc::Rc};

use crate::contract;
use crate::{
    blockchain::{address, AddressHash},
    cursor::Cursor,
    storage::{map::Map, StorageKey, StorageValue},
    ContractTrait,
};

#[derive(Clone)]
pub enum Network {
    Mainnet,
    Testnet,
    Preview,
}
pub struct TestRouter {
    contracts: Vec<(AddressHash, *mut dyn ContractTrait)>,
}
impl TestRouter {
    pub fn new() -> Self {
        Self {
            contracts: Vec::new(),
        }
    }

    pub fn push(&mut self, address: AddressHash, contract: Box<dyn ContractTrait>) {
        let contract = Box::into_raw(contract);
        self.contracts.push((address, contract));
    }

    pub fn call(&self, address: AddressHash, call_data: Cursor) -> Cursor {
        if let Some((_, contract_ptr)) = self.contracts.iter().find(|(addr, _)| address.eq(addr)) {
            unsafe {
                let mut contract: Box<dyn ContractTrait> = Box::from_raw(*contract_ptr);
                let result = contract.execute(call_data).unwrap();
                Box::leak(contract);
                result
            }
        } else {
            panic!("Contract is not present")
        }
    }
}

#[derive(Clone)]
pub struct TestContext {
    pub network: Network,
    pub events: alloc::vec::Vec<crate::event::Event>,
    pub global_store: Map<StorageKey, StorageValue>,
    pub cache_store: Map<StorageKey, StorageValue>,
    pub inputs: Vec<crate::blockchain::transaction::Input>,
    pub outputs: Vec<crate::blockchain::transaction::Output>,
    pub router: Option<Rc<RefCell<TestRouter>>>,
}

impl TestContext {
    pub fn new(
        network: Network,
        global_store: Map<StorageKey, StorageValue>,
        inputs: alloc::vec::Vec<crate::blockchain::transaction::Input>,
        outputs: alloc::vec::Vec<crate::blockchain::transaction::Output>,
        router: Option<Rc<RefCell<TestRouter>>>,
    ) -> Self {
        Self {
            network,
            events: alloc::vec::Vec::new(),
            global_store: global_store,
            cache_store: Map::new(),
            inputs,
            outputs,
            router,
        }
    }
}

impl super::Context for TestContext {
    // Just mock, data are passed from different entry point
    fn get_call_data(&self, size: usize) -> Cursor {
        Cursor::new(size)
    }
    fn emit(&mut self, event: &dyn crate::event::EventTrait) {
        let event = crate::event::Event::new(event.buffer());
        self.events.push(event);
    }

    fn log(&self, _text: &str) {}

    fn call(
        &self,
        address: &crate::blockchain::AddressHash,
        call_data: crate::cursor::Cursor,
    ) -> Cursor {
        if let Some(router) = &self.router {
            router.borrow().call(address.clone(), call_data)
        } else {
            panic!("There is no router associated with a contract")
        }
    }

    fn deploy_from_address(
        &self,
        from_address: &crate::blockchain::AddressHash,
        salt: [u8; 32],
    ) -> Result<crate::blockchain::AddressHash, crate::error::Error> {
        Ok(*from_address)
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

    fn inputs(&mut self) -> Vec<crate::blockchain::transaction::Input> {
        self.inputs.clone()
    }

    /*
    fn iter_inputs(&mut self) -> impl Iterator<Item = &crate::blockchain::transaction::Input> {
        self.inputs.iter()
    }
     */

    fn outputs(&mut self) -> Vec<crate::blockchain::transaction::Output> {
        self.outputs.clone()
    }

    /*
    fn iter_outputs(&mut self) -> impl Iterator<Item = &crate::blockchain::transaction::Output> {
        self.outputs.iter()
    }
     */
}
