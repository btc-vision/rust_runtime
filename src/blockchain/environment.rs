use alloc::{format, string::ToString};

use crate::utils::ToHex;

pub struct Environment {
    pub sender: super::Address,
    pub origin: super::Address,
    pub transaction: [u8; crate::constant::TRANSACTION_HASH_LENGHT],
    pub block_hash: [u8; crate::constant::BLOCK_HASH_LENGHT],
    pub owner: super::Address,
    pub address: super::Address,
    pub timestamp: u64,
    pub safe_rnd: u64,
}

impl ToString for Environment {
    fn to_string(&self) -> alloc::string::String {
        format!("Environment\n sender: {}, origin: {}, transaction: {:?}, block_hash: {:?}, owner: {}, address: {}, timestamp: {}, safe_rnd: {}", self.sender.to_hex(), self.origin.to_hex(), self.transaction, self.block_hash, self.owner.to_hex(), self.address.to_hex(), self.timestamp, self.safe_rnd)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_environment_decoding() {
        let buffer = crate::mem::WaBuffer::from_bytes(&[
            68, 102, 250, 135, 110, 248, 85, 140, 109, 85, 18, 71, 53, 174, 144, 79, 221, 222, 214,
            225, 179, 36, 87, 124, 87, 68, 62, 237, 41, 255, 124, 217, 68, 102, 250, 135, 110, 248,
            85, 140, 109, 85, 18, 71, 53, 174, 144, 79, 221, 222, 214, 225, 179, 36, 87, 124, 87,
            68, 62, 237, 41, 255, 124, 217, 71, 126, 176, 13, 215, 90, 186, 198, 64, 192, 122, 134,
            241, 188, 208, 24, 18, 40, 247, 207, 24, 222, 218, 124, 183, 138, 219, 244, 109, 179,
            19, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 68, 102, 250, 135, 110, 248, 85, 140, 109, 85, 18, 71, 53, 174, 144,
            79, 221, 222, 214, 225, 179, 36, 87, 124, 87, 68, 62, 237, 41, 255, 124, 217, 160, 10,
            9, 97, 12, 133, 130, 89, 89, 178, 82, 39, 219, 188, 247, 242, 177, 44, 196, 106, 249,
            60, 52, 210, 109, 42, 21, 191, 62, 6, 187, 249, 212, 188, 107, 254, 146, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]);
        let environment = unsafe { buffer.into_type::<Environment>().unwrap() };
        assert_eq!(
            environment.sender.bytes,
            [
                68, 102, 250, 135, 110, 248, 85, 140, 109, 85, 18, 71, 53, 174, 144, 79, 221, 222,
                214, 225, 179, 36, 87, 124, 87, 68, 62, 237, 41, 255, 124, 217
            ]
        );
        assert_eq!(
            environment.origin.bytes,
            [
                68, 102, 250, 135, 110, 248, 85, 140, 109, 85, 18, 71, 53, 174, 144, 79, 221, 222,
                214, 225, 179, 36, 87, 124, 87, 68, 62, 237, 41, 255, 124, 217
            ]
        );
        assert_eq!(
            environment.transaction,
            [
                71, 126, 176, 13, 215, 90, 186, 198, 64, 192, 122, 134, 241, 188, 208, 24, 18, 40,
                247, 207, 24, 222, 218, 124, 183, 138, 219, 244, 109, 179, 19, 37
            ]
        );
        assert_eq!(
            environment.block_hash,
            [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1
            ]
        );
        assert_eq!(
            environment.owner.bytes,
            [
                68, 102, 250, 135, 110, 248, 85, 140, 109, 85, 18, 71, 53, 174, 144, 79, 221, 222,
                214, 225, 179, 36, 87, 124, 87, 68, 62, 237, 41, 255, 124, 217
            ]
        );
        assert_eq!(
            environment.address.bytes,
            [
                160, 10, 9, 97, 12, 133, 130, 89, 89, 178, 82, 39, 219, 188, 247, 242, 177, 44,
                196, 106, 249, 60, 52, 210, 109, 42, 21, 191, 62, 6, 187, 249
            ]
        );
        assert_eq!(environment.timestamp, 1730845326548);
        assert_eq!(environment.safe_rnd, 0);
    }
}
