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
pub trait ToHex {
    fn get_bytes<'a>(&'a self) -> &'a [u8];
    fn to_hex<'a>(&'a self) -> alloc::string::String {
        to_hex(self.get_bytes())
    }
}

impl ToHex for &[u8] {
    fn get_bytes<'a>(&'a self) -> &'a [u8] {
        self
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    pub struct TestHex(alloc::vec::Vec<u8>);
    impl ToHex for TestHex {
        fn get_bytes<'a>(&'a self) -> &'a [u8] {
            &self.0
        }
    }

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
