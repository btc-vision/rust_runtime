use crate::{blockchain::Address, constant::ADDRESS_BYTE_LENGTH, cursor, WaBuffer};
use ethnum::u256;

pub trait EventTrait {
    fn buffer(&self) -> WaBuffer;
}

pub struct Event {
    buffer: WaBuffer,
}

impl Event {
    pub fn approve(
        owner: Address,
        spender: Address,
        value: u256,
    ) -> Result<Self, crate::error::Error> {
        let event_type = "Approve";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + ADDRESS_BYTE_LENGTH * 2 + 32, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_address(&owner)?;
        cursor.write_address(&spender)?;
        cursor.write_u256_le(&value)?;

        Ok(Event { buffer })
    }

    pub fn burn(amount: u256) -> Result<Self, crate::error::Error> {
        let event_type = "Burn";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + 32, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32_le(&32)?;
        cursor.write_u256_le(&amount)?;

        Ok(Event { buffer })
    }

    pub fn claim(amount: u256) -> Result<Self, crate::error::Error> {
        let event_type = "Claim";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + 32, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32_le(&32)?;
        cursor.write_u256_le(&amount)?;

        Ok(Event { buffer })
    }

    pub fn mint(address: Address, amount: u256) -> Result<Self, crate::error::Error> {
        let event_type = "Mint";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + 32 + ADDRESS_BYTE_LENGTH, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32_le(&64)?;
        cursor.write_address(&address)?;
        cursor.write_u256_le(&amount)?;

        Ok(Event { buffer })
    }

    pub fn stake(amount: u256) -> Result<Self, crate::error::Error> {
        let event_type = "Stake";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + 32, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32_le(&32)?;
        cursor.write_u256_le(&amount)?;

        Ok(Event { buffer })
    }

    pub fn unstake(amount: u256) -> Result<Self, crate::error::Error> {
        let event_type = "Unstake";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + 32, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32_le(&32)?;
        cursor.write_u256_le(&amount)?;

        Ok(Event { buffer })
    }

    pub fn transfer(
        addr_from: Address,
        addr_to: Address,
        amount: u256,
    ) -> Result<Self, crate::error::Error> {
        let event_type = "Transfer";
        let mut buffer = WaBuffer::new(event_type.len() + 6 + ADDRESS_BYTE_LENGTH * 2 + 32, 2);
        let mut cursor = buffer.cursor();

        cursor.write_string_with_len(event_type)?;
        cursor.write_address(&addr_from)?;
        cursor.write_address(&addr_to)?;
        cursor.write_u256_le(&amount)?;

        Ok(Event { buffer })
    }
}

impl EventTrait for Event {
    fn buffer(&self) -> WaBuffer {
        self.buffer.clone()
    }
}
