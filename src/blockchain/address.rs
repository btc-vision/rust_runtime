pub struct Address {
    pub bytes: [u8; crate::constant::ADDRESS_BYTE_LENGTH],
}

impl crate::utils::ToHex for Address {
    fn get_bytes<'a>(&'a self) -> &'a [u8] {
        self.bytes.as_ref()
    }
}

impl Address {}
