use alloc::rc::Rc;
use alloc::vec::Vec;
use core::cell::RefCell;

use crate::{
    blockchain::AddressHash,
    mem::WaBuffer,
    storage::{StorageKey, StorageValue},
    types::CallData,
    Context,
};
pub mod op_20;

pub trait ContractTrait<'a> {
    fn set_environment(&mut self, environment: &'a crate::blockchain::Environment);

    fn environment(&self) -> &'a crate::blockchain::Environment;

    fn context(&self) -> Rc<RefCell<dyn crate::env::Context>>;

    fn is_self(&self, address: &AddressHash) -> bool {
        address.eq(&self.environment().address)
    }

    fn only_deployer(&self, caller: &AddressHash) -> Result<(), crate::error::Error> {
        if self.environment().deployer.ne(caller) {
            Err(crate::error::Error::OnlyOwner)
        } else {
            Ok(())
        }
    }

    fn on_deploy(&mut self, _call_data: CallData) {
        self.context().borrow().log("On Deploy is not implemented");
    }

    fn execute(&mut self, _call_data: CallData) -> Result<WaBuffer, crate::error::Error> {
        self.context().borrow().log("Execute is not implemented");
        unimplemented!("Execute needs to be implemented");
    }

    fn log(&self, text: &str) {
        self.context().borrow().log(text);
    }
    fn emit(&self, event: &dyn crate::event::EventTrait) {
        self.context().borrow_mut().emit(event);
    }
    fn call(&self, buffer: WaBuffer) -> WaBuffer {
        self.context().borrow().call(buffer)
    }

    fn load(&self, pointer: &StorageKey) -> Option<StorageValue> {
        self.context().borrow_mut().load(pointer)
    }
    fn store(&self, pointer: StorageKey, value: StorageValue) {
        self.context().borrow_mut().store(pointer, value)
    }
    fn exists(&self, pointer: &StorageKey) -> bool {
        self.context().borrow_mut().exists(pointer)
    }
    fn next_pointer_greater_than(&self, pointer: StorageKey) -> StorageKey {
        self.context()
            .as_ref()
            .borrow()
            .next_pointer_greater_than(pointer)
    }

    fn encode_address(&self, address: &str) -> &'static [u8] {
        self.context().borrow().encode_address(address)
    }
    fn validate_bitcoin_address(&self, address: &str) -> bool {
        self.context().borrow().validate_bitcoin_address(address)
    }
    fn verify_schnorr_signature(&self, data: &[u8]) -> bool {
        self.context().borrow().verify_schnorr_signature(data)
    }
    fn sha256(&self, data: &[u8]) -> &'static [u8] {
        self.context().borrow().sha256(data)
    }
    fn sha256_double(&self, data: &[u8]) -> &'static [u8] {
        self.context().borrow().sha256_double(data)
    }
    fn rimemd160(&self, data: &[u8]) -> &'static [u8] {
        self.context().borrow().rimemd160(data)
    }

    fn inputs(&self) -> Vec<crate::blockchain::transaction::Input> {
        self.context().borrow_mut().inputs()
    }
    fn outputs(&self) -> Vec<crate::blockchain::transaction::Output> {
        self.context().borrow_mut().outputs()
    }
}
