pub struct Address {
    pub bytes: [u8; crate::constant::ADDRESS_BYTE_LENGTH],
}

impl crate::utils::ToHex for Address {
    fn get_bytes(&self) -> &[u8] {
        self.bytes.as_ref()
    }
}

impl Address {}
