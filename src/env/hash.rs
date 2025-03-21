#[allow(unused_imports)]
use crate::WaBuffer;

#[allow(unused_imports)]
use ripemd::{Digest, Ripemd160};

#[cfg(target_arch = "wasm32")]
pub fn sha256(bytes: &[u8]) -> Result<&'static [u8], crate::error::Error> {
    unsafe {
        Ok(WaBuffer::from_raw(super::global::sha256(WaBuffer::from_bytes(bytes)?.ptr())).data())
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub fn sha256(bytes: &[u8]) -> Result<&'static [u8], crate::error::Error> {
    let sha = alloc::boxed::Box::new(sha2_const::Sha256::new().update(bytes).finalize());
    Ok(alloc::boxed::Box::leak(sha))
}

#[cfg(target_arch = "wasm32")]
pub fn sha256_double(bytes: &[u8]) -> Result<&'static [u8], crate::error::Error> {
    unsafe {
        let first = super::global::sha256(WaBuffer::from_bytes(bytes)?.ptr());
        let second = super::global::sha256(first);
        Ok(WaBuffer::from_raw(second).data())
    }
}
#[cfg(not(target_arch = "wasm32"))]
pub fn sha256_double(bytes: &[u8]) -> Result<&'static [u8], crate::error::Error> {
    let first = sha2_const::Sha256::new().update(bytes).finalize();
    let second = sha2_const::Sha256::new().update(&first).finalize();
    Ok(alloc::boxed::Box::leak(alloc::boxed::Box::new(second)))
}

#[cfg(target_arch = "wasm32")]
pub fn rimemd160(bytes: &[u8]) -> Result<&'static [u8], crate::error::Error> {
    unsafe {
        Ok(WaBuffer::from_raw(super::global::rimemd160(WaBuffer::from_bytes(bytes)?.ptr())).data())
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub fn rimemd160(data: &[u8]) -> Result<&'static [u8], crate::error::Error> {
    use ripemd::digest::crypto_common::KeyInit;

    let mut hasher = ripemd::Ripemd160::new();
    hasher.update(data);
    let hash = hasher.finalize();

    Ok(alloc::boxed::Box::leak(alloc::boxed::Box::new(
        hash.to_vec(),
    )))
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_sha_256() {
        let text = "Hello world";
        assert_eq!(
            crate::utils::to_hex(super::sha256(text.as_bytes()).unwrap()),
            alloc::string::String::from(
                "0x64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c"
            )
        );
    }

    #[test]
    fn test_sha_256_double() {
        let text = "Hello world";
        assert_eq!(
            crate::utils::to_hex(super::sha256_double(text.as_bytes()).unwrap()),
            alloc::string::String::from(
                "0xf6dc724d119649460e47ce719139e521e082be8a9755c5bece181de046ee65fe"
            )
        );
    }

    #[test]
    fn test_ripemd160() {
        let text = "Hello world";
        assert_eq!(
            crate::utils::to_hex(super::rimemd160(text.as_bytes()).unwrap()),
            alloc::string::String::from("0xdbea7bd24eef40a2e79387542e36dd408b77b21a")
        );
    }
}
