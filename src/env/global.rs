use crate::mem::WaPtr;
use crate::{
    storage::{key::StorageKey, map::Map, value::StorageValue},
    WaBuffer,
};
use core::str::FromStr;
use ethnum::u256;

//#[cfg(target_arch = "wasm32")]
#[link(wasm_import_module = "env")]
extern "C" {
    #[allow(dead_code)]
    pub fn load(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn store(ptr: WaPtr) -> WaPtr;

    #[allow(dead_code)]
    pub fn nextPointerGreaterThan(ptr: WaPtr) -> WaPtr;

    #[allow(dead_code)]
    pub fn deploy(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn deployFromAddress(ptr: WaPtr) -> WaPtr;

    #[allow(dead_code)]
    pub fn call(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn log(ptr: WaPtr);
    #[allow(dead_code)]
    pub fn emit(ptr: WaPtr);
    #[allow(dead_code)]
    pub fn encodeAddress(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn validateBitcoinAddress(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn verifySchnorrSignature(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn sha256(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn ripemd160(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn inputs() -> WaPtr;
    #[allow(dead_code)]
    pub fn outputs() -> WaPtr;
}

//#[cfg(target_arch = "wasm32")]
pub struct GlobalContext {
    store: Map<StorageKey, StorageValue>,
}

//#[cfg(target_arch = "wasm32")]
impl GlobalContext {
    pub const fn new() -> Self {
        Self { store: Map::new() }
    }
}

//#[cfg(target_arch = "wasm32")]
impl super::Context for GlobalContext {
    fn log(&self, text: &str) {
        unsafe {
            if let Ok(string) = WaBuffer::from_str(text) {
                log(string.ptr());
            }
        }
    }

    fn emit(&mut self, event: &dyn crate::event::EventTrait) {
        unsafe {
            emit(event.buffer().ptr());
        }
    }

    fn call(&self, buffer: WaBuffer) -> WaBuffer {
        unsafe { WaBuffer::from_raw(call(buffer.ptr())) }
    }

    fn encode_address(&self, _address: &str) -> &'static [u8] {
        b"abcd"
    }

    fn deploy(&self, buffer: WaBuffer) -> WaBuffer {
        unsafe { WaBuffer::from_raw(deploy(buffer.ptr())) }
    }

    fn deploy_from_address(&self, buffer: WaBuffer) -> WaBuffer {
        unsafe { WaBuffer::from_raw(deployFromAddress(buffer.ptr())) }
    }

    fn validate_bitcoin_address(&self, _address: &str) -> bool {
        false
    }

    fn verify_schnorr_signature(&self, _data: &[u8]) -> bool {
        false
    }

    fn load(&mut self, pointer: &StorageKey) -> Option<StorageValue> {
        unsafe {
            let mut buffer = WaBuffer::from_raw(load(WaBuffer::from_bytes(pointer).unwrap().ptr()));
            let value: StorageValue = buffer.cursor().read_u256_be().unwrap().into();
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
                store(WaBuffer::from_bytes(value.bytes()).unwrap().ptr());
            }
        }
    }

    fn next_pointer_greater_than(&self, pointer: StorageKey) -> StorageKey {
        (u256::from_le_bytes(pointer) + 1).to_le_bytes()
    }

    fn inputs(&self) -> alloc::vec::Vec<crate::blockchain::transaction::Input> {
        alloc::vec::Vec::new()
    }

    fn outputs(&self) -> alloc::vec::Vec<crate::blockchain::transaction::Output> {
        alloc::vec::Vec::new()
    }
}
