#[derive(Clone, Debug)]
pub struct TransactionHash {
    pub bytes: [u8; crate::constant::TRANSACTION_HASH_LENGTH],
}
impl crate::utils::ToHex for TransactionHash {
    fn get_bytes(&self) -> &[u8] {
        self.bytes.as_ref()
    }
}

#[derive(Clone, Debug)]
pub struct Transaction {
    pub sender: super::AddressHash,
    pub origin: super::AddressHash,
    pub hash: TransactionHash,
}

#[derive(Clone, Debug)]
pub struct Output {
    pub index: u8,
    pub script_pub_key: [u8; 32],
    pub value: u64,
}

#[derive(Clone, Debug)]
pub struct Input {
    pub tx_id: [u8; 32],
    pub output_index: u8,
    pub script_sig: u8,
}
