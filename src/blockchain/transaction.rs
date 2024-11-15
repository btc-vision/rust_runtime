pub struct Transaction {
    pub sender: super::Address,
    pub origin: super::Address,
    pub hash: [u8; 32],
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
