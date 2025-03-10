use alloc::rc::Rc;
use alloc::vec::Vec;
use core::cell::RefCell;

use crate::{
    blockchain::{AddressHash, Environment},
    cursor::Cursor,
    storage::{StorageKey, StorageValue},
    types::CallData,
    Context,
};
pub mod op_20;

pub trait ContractTrait {
    fn context(&self) -> Rc<dyn Context>;

    fn environment(&mut self) -> &Environment;

    fn is_self(&mut self, address: &AddressHash) -> bool {
        address.eq(&self.environment().contract_address)
    }

    fn only_deployer(&mut self, caller: &AddressHash) -> Result<(), crate::error::Error> {
        if self.environment().contract_deployer.ne(caller) {
            Err(crate::error::Error::OnlyOwner)
        } else {
            Ok(())
        }
    }

    fn on_deploy(&mut self, _call_data: CallData) {
        self.context().log("On Deploy is not implemented");
    }

    fn execute(&mut self, _call_data: CallData) -> Result<Cursor, crate::error::Error> {
        self.context().log("Execute is not implemented");
        unimplemented!("Execute needs to be implemented");
    }

    fn log(&self, text: &str) {
        self.context().log(text);
    }
    fn emit(&self, event: &dyn crate::event::EventTrait) {
        self.context().emit(event);
    }
    fn call(
        &self,
        address: &crate::blockchain::AddressHash,
        data: crate::cursor::Cursor,
    ) -> Cursor {
        self.context().call(address, data)
    }

    fn load(&self, pointer: &StorageKey) -> Option<StorageValue> {
        self.context().load(pointer)
    }
    fn store(&self, pointer: StorageKey, value: StorageValue) {
        self.context().store(pointer, value)
    }
    fn exists(&self, pointer: &StorageKey) -> bool {
        self.context().exists(pointer)
    }

    fn encode_address(&self, address: &str) -> &'static [u8] {
        self.context().encode_address(address)
    }
    fn validate_bitcoin_address(&self, address: &str) -> bool {
        self.context().validate_bitcoin_address(address)
    }
    fn verify_schnorr_signature(&self, data: &[u8]) -> bool {
        self.context().verify_schnorr_signature(data)
    }
    fn sha256(&self, data: &[u8]) -> [u8; 32] {
        self.context().sha256(data)
    }
    fn sha256_double(&self, data: &[u8]) -> [u8; 32] {
        self.context().sha256_double(data)
    }
    fn ripemd160(&self, data: &[u8]) -> [u8; 20] {
        self.context().ripemd160(data)
    }

    fn inputs(&self) -> Vec<crate::blockchain::transaction::Input> {
        self.context().inputs()
    }
    fn outputs(&self) -> Vec<crate::blockchain::transaction::Output> {
        self.context().outputs()
    }
}
