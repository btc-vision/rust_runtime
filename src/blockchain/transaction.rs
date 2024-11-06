pub struct Transaction {
    pub sender: super::Address,
    pub origin: super::Address,
    pub hash: [u8; 32],
}
