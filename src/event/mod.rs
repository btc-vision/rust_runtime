use crate::{constant::ADDRESS_BYTE_LENGTH, AddressHash, AsWaPtr, AsWaSize, Cursor, U256};

pub trait EventTrait: AsWaPtr + AsWaSize {
    fn buffer(&self) -> &'static [u8];
}

#[derive(Clone)]
#[repr(transparent)]
pub struct Event(pub &'static [u8]);

impl Event {
    pub fn new(buffer: &'static [u8]) -> Event {
        Self(buffer)
    }

    pub fn approve(
        owner: AddressHash,
        spender: AddressHash,
        value: U256,
    ) -> Result<Self, crate::error::Error> {
        let event_type = "Approve";
        let byte_size = ADDRESS_BYTE_LENGTH * 2 + 32;
        //let mut buffer = crate::mem::WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32(&(byte_size as u32), true)?;
        cursor.write_address(&owner)?;
        cursor.write_address(&spender)?;
        cursor.write_u256(&value, true)?;

        Ok(Event(cursor.into_inner()))
    }

    pub fn burn(amount: U256) -> Result<Self, crate::error::Error> {
        let event_type = "Burn";
        let byte_size = 32;
        //let mut buffer = WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32(&(byte_size as u32), true)?;
        cursor.write_u256(&amount, true)?;

        Ok(Event(cursor.into_inner()))
    }

    pub fn claim(amount: U256) -> Result<Self, crate::error::Error> {
        let event_type = "Claim";
        let byte_size = 32;
        //let mut buffer = WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32(&(byte_size as u32), true)?;
        cursor.write_u256(&amount, true)?;

        Ok(Event(cursor.into_inner()))
    }

    pub fn mint(address: AddressHash, amount: U256) -> Result<Self, crate::error::Error> {
        let event_type = "Mint";
        let byte_size = 32 + ADDRESS_BYTE_LENGTH;
        //let mut buffer = WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32(&(byte_size as u32), true)?;
        cursor.write_address(&address)?;
        cursor.write_u256(&amount, true)?;

        Ok(Event(cursor.into_inner()))
    }

    pub fn stake(amount: U256) -> Result<Self, crate::error::Error> {
        let event_type = "Stake";
        let byte_size = 32;
        // let mut buffer = WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32(&(byte_size as u32), true)?;
        cursor.write_u256(&amount, true)?;

        Ok(Event(cursor.into_inner()))
    }

    pub fn unstake(amount: U256) -> Result<Self, crate::error::Error> {
        let event_type = "Unstake";
        let byte_size = 32;
        //let mut buffer = WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;
        cursor.write_u32(&(byte_size as u32), true)?;
        cursor.write_u256(&amount, true)?;

        Ok(Event(cursor.into_inner()))
    }

    pub fn transfer(
        addr_from: AddressHash,
        addr_to: AddressHash,
        amount: U256,
    ) -> Result<Self, crate::error::Error> {
        let event_type = "Transfer";

        let byte_size = ADDRESS_BYTE_LENGTH * 2 + 32;
        //let mut buffer = WaBuffer::new(event_type.len() + 6 + byte_size, 1)?;
        let mut cursor = Cursor::new(event_type.len() + 6 + byte_size);

        cursor.write_string_with_len(event_type)?;

        cursor.write_u32(&(byte_size as u32), true)?;

        cursor.write_address(&addr_from)?;
        cursor.write_address(&addr_to)?;
        cursor.write_u256(&amount, true)?;

        Ok(Event(cursor.into_inner()))
    }
}

impl AsWaPtr for Event {
    fn as_wa_ptr(&self) -> u32 {
        self.0.as_wa_ptr()
    }
}

impl AsWaSize for Event {
    fn as_wa_size(&self) -> u32 {
        self.0.as_wa_size()
    }
}

impl EventTrait for Event {
    fn buffer(&self) -> &'static [u8] {
        self.0
    }
}
