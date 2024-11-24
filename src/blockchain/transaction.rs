pub struct TransactionHash {
    pub bytes: [u8; crate::constant::TRANSACTION_HASH_LENGTH],
}
impl crate::utils::ToHex for TransactionHash {
    fn get_bytes(&self) -> &[u8] {
        self.bytes.as_ref()
    }
}

pub struct Transaction {
    pub sender: super::Address,
    pub origin: super::Address,
    pub hash: TransactionHash,
}

pub struct Output {
    pub index: u8,
    pub script_pub_key: [u8; 32],
    pub value: u64,
}

pub struct Input {
    pub tx_id: [u8; 32],
    pub output_index: u8,
    pub script_sig: u8,
}
