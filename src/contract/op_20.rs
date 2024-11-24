use ethnum::U256;

use crate::{
    constant::ADDRESS_BYTE_LENGTH, cursor, math::abi::encode_selector_static, types::Selector,
    WaBuffer,
};

pub struct OP20Params {
    pub max_supply: ethnum::U256,
    pub decimals: u8,
    pub name: &'static str,
    pub symbol: &'static str,
}

pub trait OP20Trait: super::ContractTrait {
    fn execute(
        &self,
        selector: Selector,
        _call_data: crate::types::CallData,
    ) -> Result<crate::WaBuffer, crate::error::Error> {
        const OWNER: Selector = encode_selector_static("owner");
        match selector {
            OWNER => {
                let mut buffer = WaBuffer::new(ADDRESS_BYTE_LENGTH, 2);
                let mut cursor = buffer.cursor();
                cursor.write_address(&self.owner())?;
                Ok(buffer)
            }
            _ => Err(crate::error::Error::UnknownSelector),
        }
    }

    fn total_supply(&self) -> U256;
    fn max_supply(&self) -> U256;
    fn decimals(&self) -> u8;
    fn name(&self) -> alloc::string::String;
    fn symbol(&self) -> alloc::string::String;

    fn allowance(&self, call_data: crate::types::CallData) -> crate::WaBuffer {
        WaBuffer::from_bytes(call_data.into_inner())
    }

    fn balance_of(&self, call_data: crate::types::CallData) -> crate::WaBuffer {
        WaBuffer::from_bytes(call_data.into_inner())
    }
    fn transfer(call_data: crate::types::CallData) -> crate::WaBuffer {
        WaBuffer::from_bytes(call_data.into_inner())
    }
    fn transfer_from(call_data: crate::types::CallData) -> crate::WaBuffer {
        WaBuffer::from_bytes(call_data.into_inner())
    }
    fn approve(call_data: crate::types::CallData) -> crate::WaBuffer {
        WaBuffer::from_bytes(call_data.into_inner())
    }
    fn burn(call_data: crate::types::CallData) -> crate::WaBuffer {
        WaBuffer::from_bytes(call_data.into_inner())
    }
}
