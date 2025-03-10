use core::cell::RefCell;
extern crate std;
use alloc::vec::Vec;
use alloc::{boxed::Box, rc::Rc};
use bitcoin::{Address, Network};
use core::str::FromStr;

use crate::blockchain::Environment;
use crate::{
    blockchain::AddressHash,
    cursor::Cursor,
    storage::{map::Map, StorageKey, StorageValue},
    ContractTrait,
};

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
    pub environment: Environment,
    pub events: RefCell<alloc::vec::Vec<crate::event::Event>>,
    pub global_store: RefCell<Map<StorageKey, StorageValue>>,
    pub cache_store: RefCell<Map<StorageKey, StorageValue>>,
    pub inputs: Vec<crate::blockchain::transaction::Input>,
    pub outputs: Vec<crate::blockchain::transaction::Output>,
    pub router: Option<Rc<RefCell<TestRouter>>>,
}

impl Default for TestContext {
    fn default() -> Self {
        Self {
            network: bitcoin::Network::Bitcoin,
            environment: Environment::default(),
            events: RefCell::new(Vec::new()),
            global_store: RefCell::new(Map::new()),
            cache_store: RefCell::new(Map::new()),
            inputs: Vec::new(),
            outputs: Vec::new(),
            router: None,
        }
    }
}

impl super::Context for TestContext {
    // Just mock, data are passed from different entry point
    fn call_data(&self, size: usize) -> Cursor {
        Cursor::new(size)
    }
    fn environment(&self) -> Environment {
        self.environment.clone()
    }
    fn emit(&self, event: &dyn crate::event::EventTrait) {
        let event = crate::event::Event::new(event.buffer());
        self.events.borrow_mut().push(event);
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

    fn validate_bitcoin_address(&self, address: &str) -> bool {
        match Address::from_str(address) {
            Ok(addr) => {
                if addr.is_valid_for_network(self.network) {
                    true
                } else {
                    false
                }
            }
            Err(e) => false,
        }
    }

    fn verify_schnorr_signature(&self, _data: &[u8]) -> bool {
        let SECP: secp256k1::Secp256k1<secp256k1::All> = secp256k1::Secp256k1::new();

        let xonly_public_key = secp256k1::XOnlyPublicKey::from_byte_array(&[0u8; 32]).unwrap();
        let signature = secp256k1::schnorr::Signature::from_byte_array([0u8; 64]);
        let result = SECP.verify_schnorr(&signature, &[0u8; 32], &xonly_public_key);
        result.is_ok()
    }

    fn load(&self, pointer: &crate::storage::StorageKey) -> Option<crate::storage::StorageValue> {
        if let Some(value) = self.cache_store.borrow().get(pointer) {
            Some(*value)
        } else if let Some(value) = self.global_store.borrow().get(pointer) {
            self.cache_store.borrow_mut().insert(*pointer, *value);
            Some(*value)
        } else {
            None
        }
        .filter(|&value| !StorageValue::ZERO.eq(&value))
    }

    fn store(&self, pointer: crate::storage::StorageKey, value: crate::storage::StorageValue) {
        if if let Some(old) = self.cache_store.borrow().get(&pointer) {
            value.ne(old)
        } else {
            true
        } {
            self.cache_store.borrow_mut().insert(pointer, value);
            self.global_store.borrow_mut().insert(pointer, value);
        }
    }

    fn exists(&self, pointer: &StorageKey) -> bool {
        if self.cache_store.borrow().contains_key(pointer) {
            true
        } else if let Some(value) = self.global_store.borrow().get(pointer) {
            self.cache_store.borrow_mut().insert(*pointer, *value);
            true
        } else {
            false
        }
    }

    fn inputs(&self) -> Vec<crate::blockchain::transaction::Input> {
        self.inputs.clone()
    }

    /*
    fn iter_inputs(&mut self) -> impl Iterator<Item = &crate::blockchain::transaction::Input> {
        self.inputs.iter()
    }
     */

    fn outputs(&self) -> Vec<crate::blockchain::transaction::Output> {
        self.outputs.clone()
    }

    /*
    fn iter_outputs(&mut self) -> impl Iterator<Item = &crate::blockchain::transaction::Output> {
        self.outputs.iter()
    }
     */
}

#[cfg(test)]
mod tests {
    use crate::Context;

    use super::TestContext;

    #[test]
    fn test_validate_mainnet_address() {
        let context = TestContext::default();
        assert_eq!(
            true,
            context.validate_bitcoin_address("bc1qnghhhgvz5cn8n6x2fy06yzvkuermcm5ljn06gw")
        );
    }

    #[test]
    fn test_validate_testnet_address() {
        let context = TestContext {
            network: bitcoin::Network::Testnet,
            ..Default::default()
        };
        assert_eq!(
            true,
            context.validate_bitcoin_address("mym4vP87LdQp9YzRbggpS46fYiQFfR52Nq")
        );
    }

    #[test]
    fn test_validate_p2sh_mainnet_address() {
        let context = TestContext {
            network: bitcoin::Network::Bitcoin,
            ..Default::default()
        };
        assert_eq!(
            true,
            context.validate_bitcoin_address("3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy")
        );
    }

    #[test]
    fn test_invalid_address_format() {
        let context = TestContext {
            network: bitcoin::Network::Bitcoin,
            ..Default::default()
        };
        assert_eq!(false, context.validate_bitcoin_address("invalid_address"));
    }

    #[test]
    fn test_address_valid_but_wrong_network() {
        let context = TestContext {
            network: bitcoin::Network::Bitcoin,
            ..Default::default()
        };
        assert_eq!(
            false,
            context.validate_bitcoin_address("mym4vP87LdQp9YzRbggpS46fYiQFfR52Nq")
        );
    }

    #[test]
    fn test_valid_regtest_address() {
        let context = TestContext {
            network: bitcoin::Network::Regtest,
            ..Default::default()
        };
        assert_eq!(
            true,
            context.validate_bitcoin_address(
                "bcrt1pe0slk2klsxckhf90hvu8g0688rxt9qts6thuxk3u4ymxeejw53gs0xjlhn"
            )
        );
    }

    #[test]
    fn test_valid_regtest_address_segwit() {
        let context = TestContext {
            network: bitcoin::Network::Regtest,
            ..Default::default()
        };
        assert_eq!(
            true,
            context.validate_bitcoin_address("bcrt1qfqsr3m7vjxheghcvw4ks0fryqxfq8qzjf8fxes")
        );
    }

    #[test]
    fn test_valid_regtest_address_legacy() {
        let context = TestContext {
            network: bitcoin::Network::Regtest,
            ..Default::default()
        };
        assert_eq!(
            true,
            context.validate_bitcoin_address("mn6KYibk94NhScakhgVPQdGE1bnscugRDG")
        );
    }

    #[test]
    fn test_valid_regtest_address_p2sh() {
        let context = TestContext {
            network: bitcoin::Network::Regtest,
            ..Default::default()
        };
        assert_eq!(
            true,
            context.validate_bitcoin_address("2MyLLEUGJSusHvPDNHTwYnG9FAJcrQ3VPZY")
        );
    }
}
