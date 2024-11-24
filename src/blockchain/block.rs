pub struct BlockHash {
    pub bytes: [u8; crate::constant::BLOCK_HASH_LENGTH],
}

impl crate::utils::ToHex for BlockHash {
    fn get_bytes(&self) -> &[u8] {
        self.bytes.as_ref()
    }
}
