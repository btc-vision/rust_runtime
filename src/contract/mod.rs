use crate::{
    cursor::Cursor,
    storage::{StorageKey, StorageValue},
    types::CallData,
    AddressHash, Context, Environment,
};
use alloc::{rc::Rc, vec::Vec};
pub mod op_20;

pub trait ContractTrait {
    fn context(&self) -> Rc<dyn Context>;

    fn on_deploy(&mut self, _call_data: CallData) -> Result<u32, crate::error::Error>;

    fn execute(&mut self, _call_data: CallData) -> Result<Cursor, crate::error::Error>;

    #[inline]
    fn log(&self, text: &str) {
        self.context().log(text);
    }

    #[inline]
    fn emit(&self, event: &dyn crate::event::EventTrait) {
        self.context().emit(event);
    }

    #[inline]
    fn call(&self, address: &AddressHash, data: crate::cursor::Cursor) -> Cursor {
        self.context().call(address, data)
    }

    #[inline]
    fn load(&self, pointer: &StorageKey) -> Option<StorageValue> {
        self.context().load(pointer)
    }

    #[inline]
    fn store(&self, pointer: StorageKey, value: StorageValue) {
        self.context().store(pointer, value)
    }

    #[inline]
    fn exists(&self, pointer: &StorageKey) -> bool {
        self.context().exists(pointer)
    }

    #[inline]
    fn encode_address(&self, address: &str) -> &'static [u8] {
        self.context().encode_address(address)
    }

    #[inline]
    fn validate_bitcoin_address(&self, address: &str) -> Result<bool, crate::error::Error> {
        self.context().validate_bitcoin_address(address)
    }

    #[inline]
    fn verify_schnorr_signature(
        &self,
        address: &AddressHash,
        signature: &[u8],
        message: &[u8],
    ) -> Result<bool, crate::error::Error> {
        self.context()
            .verify_schnorr_signature(address, signature, message)
    }

    #[inline]
    fn sha256(&self, data: &[u8]) -> [u8; 32] {
        self.context().sha256(data)
    }

    #[inline]
    fn sha256_double(&self, data: &[u8]) -> [u8; 32] {
        self.context().sha256_double(data)
    }

    #[inline]
    fn ripemd160(&self, data: &[u8]) -> [u8; 20] {
        self.context().ripemd160(data)
    }

    #[inline]
    fn environment(&mut self) -> Environment {
        self.context().environment()
    }

    #[inline]
    fn inputs(&self) -> Vec<crate::blockchain::transaction::Input> {
        self.context().inputs()
    }

    #[inline]
    fn outputs(&self) -> Vec<crate::blockchain::transaction::Output> {
        self.context().outputs()
    }
}
