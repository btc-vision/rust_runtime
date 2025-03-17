#[allow(unused_imports)]
use crate::{
    storage::{StorageKey, StorageValue},
    AddressHash, AsWaMutPtr, AsWaPtr, AsWaSize, Cursor, Environment, Input, Output,
};
use alloc::vec::Vec;
#[allow(unused_imports)]
use core::str::FromStr;
pub mod global;

#[cfg(not(target_arch = "wasm32"))]
mod test;

#[cfg(not(target_arch = "wasm32"))]
pub use test::{TestContext, TestRouter};

#[cfg(target_arch = "wasm32")]
pub fn sha256(bytes: &[u8]) -> [u8; 32] {
    unsafe {
        let mut result = [0u8; 32];
        global::sha256(
            bytes.as_wa_ptr(),
            bytes.as_wa_size(),
            result.as_wa_mut_ptr(),
        );
        result
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub fn sha256(bytes: &[u8]) -> [u8; 32] {
    let sha = sha2_const::Sha256::new().update(bytes).finalize();
    sha
}

#[cfg(target_arch = "wasm32")]
pub fn ripemd160(bytes: &[u8]) -> [u8; 20] {
    let result = [0u8; 20];

    unsafe {
        global::ripemd160(
            bytes.as_wa_ptr(),
            bytes.as_wa_size(),
            result[0..20].as_ref().as_wa_ptr(),
        );
        result
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub fn ripemd160(data: &[u8]) -> [u8; 20] {
    use ripemd::Digest;

    let mut hasher = ripemd::Ripemd160::new();
    hasher.update(data);
    let hash = hasher.finalize();

    hash[0..20].try_into().unwrap()
}

#[cfg(target_arch = "wasm32")]
pub fn log(text: &str) {
    unsafe {
        let mut cursor = Cursor::new(text.as_bytes().len() + 3);
        cursor.write_string_with_len(text).unwrap();
        global::log(cursor.as_wa_ptr(), cursor.as_wa_size());
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub fn log(text: &str) {
    libc_print::libc_println!("{}", text);
}

pub trait Context {
    fn call_data(&self, size: usize) -> Cursor;
    fn environment(&self) -> Environment;
    fn log(&self, text: &str) {
        log(text)
    }
    fn emit(&self, event: &dyn crate::event::EventTrait);
    fn call(&self, address: &AddressHash, data: Cursor) -> Cursor;

    fn deploy_from_address(
        &self,
        from_address: &AddressHash,
        salt: [u8; 32],
    ) -> Result<AddressHash, crate::error::Error>;

    fn load(&self, pointer: &StorageKey) -> Option<StorageValue>;
    fn store(&self, pointer: StorageKey, value: StorageValue);
    fn exists(&self, pointer: &StorageKey) -> bool;

    fn encode_address(&self, address: &str) -> &'static [u8];
    fn validate_bitcoin_address(&self, address: &str) -> Result<bool, crate::error::Error>;
    fn verify_schnorr_signature(
        &self,
        address: &AddressHash,
        signature: &[u8],
        hash: &[u8],
    ) -> Result<bool, crate::error::Error>;
    fn sha256(&self, data: &[u8]) -> [u8; 32] {
        sha256(data)
    }
    fn sha256_double(&self, data: &[u8]) -> [u8; 32] {
        self.sha256(&self.sha256(data))
    }
    fn ripemd160(&self, data: &[u8]) -> [u8; 20] {
        ripemd160(data)
    }

    fn inputs(&self) -> Vec<Input>;
    fn outputs(&self) -> Vec<Output>;
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_sha_256() {
        let text = "Hello world";
        assert_eq!(
            crate::utils::to_hex(&super::sha256(text.as_bytes())),
            alloc::string::String::from(
                "0x64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c"
            )
        );
    }

    #[test]
    fn test_ripemd160() {
        let text = "Hello world";
        assert_eq!(
            crate::utils::to_hex(&super::ripemd160(text.as_bytes())),
            alloc::string::String::from("0xdbea7bd24eef40a2e79387542e36dd408b77b21a")
        );
    }
}
