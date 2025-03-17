use core::str;

use crate::{
    constant::{HASH_BYTE_LENGTH, TRANSACTION_HASH_BYTE_LENGTH},
    storage::map::Map,
    types::Selector,
    AddressHash, FromBytes, Input, Output, TransactionHash, U256,
};
use alloc::vec::Vec;

impl super::Cursor {
    pub fn read_u32_be_unchecked(&mut self) -> u32 {
        self.reader += 4;
        u32::from_be_bytes(self.inner[self.reader - 4..self.reader].try_into().unwrap())
    }

    pub fn read_u8(&mut self) -> Result<u8, crate::error::Error> {
        if self.reader < self.inner.len() {
            let result = self.inner[self.reader];
            self.reader += 1;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_u16(&mut self, be: bool) -> Result<u16, crate::error::Error> {
        if self.reader + 2 <= self.inner.len() {
            let result = if be {
                u16::from_be_bytes(self.inner[self.reader..self.reader + 2].try_into().unwrap())
            } else {
                u16::from_le_bytes(self.inner[self.reader..self.reader + 2].try_into().unwrap())
            };
            self.reader += 2;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_u32(&mut self, be: bool) -> Result<u32, crate::error::Error> {
        if self.reader + 4 <= self.inner.len() {
            let result = if be {
                u32::from_be_bytes(self.inner[self.reader..self.reader + 4].try_into().unwrap())
            } else {
                u32::from_le_bytes(self.inner[self.reader..self.reader + 4].try_into().unwrap())
            };
            self.reader += 4;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_u64(&mut self, be: bool) -> Result<u64, crate::error::Error> {
        if self.reader + 8 <= self.inner.len() {
            let result = if be {
                u64::from_be_bytes(self.inner[self.reader..self.reader + 8].try_into().unwrap())
            } else {
                u64::from_le_bytes(self.inner[self.reader..self.reader + 8].try_into().unwrap())
            };
            self.reader += 8;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_u128(&mut self, be: bool) -> Result<u128, crate::error::Error> {
        if self.reader + 16 <= self.inner.len() {
            let result = if be {
                u128::from_be_bytes(
                    self.inner[self.reader..self.reader + 16]
                        .try_into()
                        .unwrap(),
                )
            } else {
                u128::from_le_bytes(
                    self.inner[self.reader..self.reader + 16]
                        .try_into()
                        .unwrap(),
                )
            };
            self.reader += 16;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_u256(&mut self, be: bool) -> Result<U256, crate::error::Error> {
        if self.reader + 32 <= self.inner.len() {
            let result = if be {
                U256::from_big_endian(
                    self.inner[self.reader..self.reader + 32]
                        .try_into()
                        .unwrap(),
                )
            } else {
                U256::from_little_endian(
                    self.inner[self.reader..self.reader + 32]
                        .try_into()
                        .unwrap(),
                )
            };
            self.reader += 32;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_bool(&mut self) -> Result<bool, crate::error::Error> {
        Ok((self.read_u8()?) != 0)
    }

    pub fn read_selector(&mut self) -> Result<Selector, crate::error::Error> {
        self.read_u32(false)
    }

    pub fn read_bytes(&mut self, size: usize) -> Result<&[u8], crate::error::Error> {
        if self.reader + size <= self.inner.len() {
            let result = &self.inner[self.reader..self.reader + size];
            self.reader += size;
            Ok(result)
        } else {
            Err(crate::error::Error::NoMoreData)
        }
    }

    pub fn read_bytes_with_length(&mut self, be: bool) -> Result<&[u8], crate::error::Error> {
        let length = self.read_u32(be)?;
        return self.read_bytes(length as usize);
    }

    pub fn read_address(&mut self) -> Result<AddressHash, crate::error::Error> {
        Ok(AddressHash::from_bytes(
            self.read_bytes(crate::constant::ADDRESS_BYTE_LENGTH)?,
        ))
    }

    pub fn read_address_value_map(
        &mut self,
    ) -> Result<Map<AddressHash, U256>, crate::error::Error> {
        let len = self.read_u16(true)?;
        let mut result = Map::new();

        for _ in 0..len {
            result.insert(self.read_address()?, self.read_u256(true)?);
        }
        Ok(result)
    }

    pub fn read_string_with_len(&mut self) -> Result<&str, crate::error::Error> {
        let len = self.read_u16(true)?;

        let pos = self.reader;
        self.reader += len as usize;
        unsafe {
            Ok(str::from_raw_parts(
                self.inner.as_ptr().add(pos),
                len as usize,
            ))
        }
    }

    pub fn read_transaction_inputs(&mut self) -> Result<Vec<crate::Input>, crate::error::Error> {
        let len = self.read_u8()?;
        let mut inputs = Vec::with_capacity(len as usize);

        for _ in [0..len] {
            inputs.push(Input {
                tx_id: TransactionHash::from_bytes(self.read_bytes(TRANSACTION_HASH_BYTE_LENGTH)?),
                output_index: self.read_u8()?,
                script_sig: self.read_u8()?,
            });
        }

        Ok(inputs)
    }

    pub fn read_transaction_outputs(&mut self) -> Result<Vec<crate::Output>, crate::error::Error> {
        let len = self.read_u8()?;
        let mut outputs = Vec::with_capacity(len as usize);

        for _ in [0..len] {
            outputs.push(Output {
                index: self.read_u8()?,
                script_pub_key: self
                    .read_bytes(HASH_BYTE_LENGTH)?
                    .try_into()
                    .map_err(|_| crate::error::Error::ConvertError)?,
                value: self.read_u64(true)?,
            });
        }

        Ok(outputs)
    }
}
