use crate::U256;

pub const fn bytes4(bytes: [u8; 4]) -> u32 {
    u32::from_le_bytes(bytes)
}

pub const fn bytes8(bytes: [u8; 8]) -> u64 {
    u64::from_le_bytes(bytes)
}

pub fn bytes32(bytes: &[u8; 32]) -> U256 {
    U256::from_little_endian(bytes)
}
