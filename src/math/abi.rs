use crate::{sha256, storage::StorageKey};
/**
 * Encode selector in static build time
 */
pub const fn encode_selector_const(selector: &str) -> crate::types::Selector {
    let bytes = sha2_const::Sha256::new()
        .update(selector.as_bytes())
        .finalize();

    ((bytes[3] as u32) << 24)
        | ((bytes[2] as u32) << 16)
        | ((bytes[1] as u32) << 8)
        | (bytes[0] as u32)
}

/**
 * Encode selector in the runtime
 */
pub fn encode_selector(selector: &str) -> crate::types::Selector {
    super::bytes::bytes4(
        crate::env::sha256(selector.as_bytes())[0..4]
            .try_into()
            .unwrap(),
    )
}

pub const fn encode_pointer_const(unique_identifier: u16) -> StorageKey {
    let mut key = [0; crate::constant::STORE_KEY_BYTE_LENGTH];
    key[0] = (unique_identifier & 0xff) as u8;
    key[1] = ((unique_identifier >> 8) & 0xff) as u8;

    StorageKey::new(key)
}

pub fn encode_pointer(unique_identifier: u16, typed: &[u8]) -> StorageKey {
    let hash = if typed.len() != 32 {
        sha256(typed)
    } else {
        typed.try_into().unwrap()
    };

    let mut final_pointer: [u8; 32] = [0; 32];
    final_pointer[0] = (unique_identifier & 0xff) as u8;
    final_pointer[1] = ((unique_identifier >> 8) & 0xff) as u8;
    final_pointer[2..32].copy_from_slice(&hash[..30]);

    StorageKey::new(final_pointer)
}
