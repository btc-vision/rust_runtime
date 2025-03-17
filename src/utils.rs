use crate::U256;
use alloc::slice;

pub trait AsBytes {
    fn as_bytes(&self) -> &[u8];
}

pub trait FromBytes {
    fn from_bytes(bytes: &[u8]) -> Self;
}

pub trait AsWaPtr {
    fn as_wa_ptr(&self) -> u32;
}

pub trait AsWaMutPtr {
    fn as_wa_mut_ptr(&mut self) -> u32;
}

pub trait AsWaSize {
    fn as_wa_size(&self) -> u32;
}

impl AsBytes for &[u8] {
    fn as_bytes(&self) -> &[u8] {
        self
    }
}

impl AsBytes for U256 {
    fn as_bytes(&self) -> &[u8] {
        unsafe { slice::from_raw_parts(self as *const U256 as *const u8, 32) }
    }
}

impl AsWaPtr for &[u8] {
    fn as_wa_ptr(&self) -> u32 {
        self.as_ptr() as u32
    }
}

impl AsWaMutPtr for &mut [u8] {
    fn as_wa_mut_ptr(&mut self) -> u32 {
        self.as_mut_ptr() as u32
    }
}

impl AsWaPtr for [u8; 32] {
    fn as_wa_ptr(&self) -> u32 {
        self.as_ptr() as u32
    }
}

impl AsWaMutPtr for [u8; 32] {
    fn as_wa_mut_ptr(&mut self) -> u32 {
        self.as_mut_ptr() as u32
    }
}

impl AsWaSize for &[u8] {
    fn as_wa_size(&self) -> u32 {
        self.len() as u32
    }
}

impl AsWaPtr for u32 {
    fn as_wa_ptr(&self) -> u32 {
        self as *const u32 as u32
    }
}

const BASE64_TABLE: [char; 16] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
];

pub fn to_hex(bytes: &[u8]) -> alloc::string::String {
    let mut string = alloc::string::String::with_capacity(bytes.len() * 2 + 3);
    string.push_str("0x");

    for byte in bytes.iter() {
        string.push(BASE64_TABLE[(*byte >> 4) as usize]);
        string.push(BASE64_TABLE[(*byte & 0xf) as usize]);
    }
    string
}
pub trait ToHex: AsBytes {
    fn to_hex(&self) -> alloc::string::String {
        to_hex(self.as_bytes())
    }
}

impl ToHex for &[u8] {}

#[cfg(test)]
mod tests {
    use super::*;

    pub struct TestHex(alloc::vec::Vec<u8>);
    impl AsBytes for TestHex {
        fn as_bytes(&self) -> &[u8] {
            &self.0
        }
    }

    impl ToHex for TestHex {}

    #[test]
    fn test_to_hex() {
        let v = TestHex(alloc::vec![0xda, 0x02, 0xa1, 0x1f]);
        assert_eq!(v.to_hex(), alloc::string::String::from("0xda02a11f"));
        assert_eq!(
            to_hex(&255u8.to_be_bytes()),
            alloc::string::String::from("0xff")
        );
        assert_eq!(
            to_hex(&255u64.to_be_bytes()),
            alloc::string::String::from("0x00000000000000ff")
        );
    }
}
