const BASE64_TABLE: [char; 16] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
];
pub trait ToHex {
    fn get_bytes<'a>(&'a self) -> &'a [u8];
    fn to_hex<'a>(&'a self) -> alloc::string::String {
        let bytes = self.get_bytes();
        let mut string = alloc::string::String::with_capacity(bytes.len() * 2 + 3);
        string.push_str("0x");

        for byte in bytes.iter() {
            string.push(BASE64_TABLE[(*byte >> 4) as usize]);
            string.push(BASE64_TABLE[(*byte & 0xf) as usize]);
        }
        string
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
    fn it_works() {
        let v = TestHex(alloc::vec![0xda, 0x02, 0xa1, 0x1f]);
        assert_eq!(v.to_hex(), alloc::string::String::from("0xda02a11f"));
    }
}
