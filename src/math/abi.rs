/**
 * Encode selector in static build time
 */
pub const fn encode_selector_static(selector: &str) -> crate::types::Selector {
    let bytes = sha2_const::Sha256::new()
        .update(selector.as_bytes())
        .finalize();

    ((bytes[0] as u32) << 24)
        | ((bytes[1] as u32) << 16)
        | ((bytes[2] as u32) << 8)
        | (bytes[3] as u32)
}

/**
 * Encode selector in the runtime
 */
pub fn encode_selector(selector: &str) -> crate::types::Selector {
    super::bytes::bytes4(crate::env::sha256(selector.as_bytes()).try_into().unwrap())
}

pub fn encode_pointer(typed: &[u8]) -> crate::types::MemorySlotPointer {
    super::bytes::bytes32(crate::env::sha256(typed).try_into().unwrap())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_encode_selector() {
        let selector = "Abi";
    }
}
