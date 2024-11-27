use rust_runtime::{
    blockchain::AddressHash,
    contract::op_20::{Pointer, SELECTOR_TRANSFER},
    ethnum::u256,
    log,
    math::abi::encode_selector_const,
    storage::{
        multi_address_map::MultiAddressMemoryMap,
        stored::{StoredU256, StoredU8},
        stored_map::StoredMap,
        stored_string::StoredString,
        StorageValue,
    },
    types::{CallData, Selector},
    ContractTrait, OP20Trait,
};

const SELECTOR_AIRDROP: Selector = encode_selector_const("airdrop");
const SELECTOR_AIRDROP_DEFINED: Selector = encode_selector_const("airdropDefined");
const SELECTOR_MINT: Selector = encode_selector_const("mint");

pub struct Contract {
    environment: Option<&'static rust_runtime::blockchain::Environment>,
    params: rust_runtime::contract::op_20::OP20Params,
    balance_of_map: StoredMap<AddressHash, u256>,
    allowance_map: MultiAddressMemoryMap,
    total_supply: StoredU256,
}
impl Contract {
    pub const fn new() -> Self {
        Self {
            environment: None,
            params: rust_runtime::contract::op_20::OP20Params {
                max_supply: StoredU256::new_const(
                    Pointer::MaxSupply.u16(),
                    u256::new(2_100_000_000_000_000),
                ),
                decimals: StoredU8::new_const(Pointer::Decimals.u16(), 8),
                name: StoredString::new_const(Pointer::Name.u16(), "Moto"),
                symbol: StoredString::new_const(Pointer::Symbol.u16(), "MOTO"),
            },
            balance_of_map: StoredMap::new(Pointer::BalanceOfMap.u16()),
            allowance_map: MultiAddressMemoryMap::new(
                Pointer::AllowanceMap.u16(),
                StorageValue::ZERO,
            ),
            total_supply: StoredU256::new_const(Pointer::TotalSupply.u16(), u256::ZERO),
        }
    }
}

impl Contract {
    fn execute(
        &mut self,
        selector: Selector,
        call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        match selector {
            SELECTOR_MINT => self.mint(call_data),
            SELECTOR_AIRDROP => self.airdrop(call_data),
            SELECTOR_AIRDROP_DEFINED => self.airdrop_defined(call_data),
            _ => OP20Trait::execute_base(self, selector, call_data),
        }
    }

    fn mint(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        self.only_owner(&self.environment().sender)?;

        let mut response = crate::WaBuffer::new(32, 1);
        let mut cursor = response.cursor();
        cursor.write_bool(self.mint_base(
            &call_data.read_address()?,
            call_data.read_u256_be()?,
            false,
        )?)?;

        return Ok(response);
    }

    fn airdrop(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        self.only_owner(&self.environment().sender)?;
        let drops = call_data.read_address_value_map()?;
        for (address, amount) in drops.iter() {
            self.mint_base(address, amount.clone(), false)?;
        }

        let mut response = crate::WaBuffer::new(32, 1);
        let mut cursor = response.cursor();
        cursor.write_bool(true)?;
        Ok(response)
    }

    fn airdrop_defined(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        self.only_owner(&self.environment().sender)?;
        let amount = call_data.read_u256_be()?;
        let amount_of_addresses: u32 = call_data.read_u32_le()?;

        for _ in 0..amount_of_addresses {
            let address = call_data.read_address()?;

            self.mint_base(&address, amount, false)?;
        }

        let mut response = crate::WaBuffer::new(32, 1);
        let mut cursor = response.cursor();
        cursor.write_bool(true)?;
        Ok(response)
    }
}

impl rust_runtime::contract::op_20::OP20Trait for Contract {
    fn params(&mut self) -> &mut rust_runtime::OP20Params {
        &mut self.params
    }
    fn total_supply(&mut self) -> &mut StoredU256 {
        &mut self.total_supply
    }

    fn allowance_map(&mut self) -> &mut MultiAddressMemoryMap {
        &mut self.allowance_map
    }

    fn balance_of_map(&mut self) -> &mut StoredMap<AddressHash, u256> {
        &mut self.balance_of_map
    }
}

impl rust_runtime::contract::ContractTrait for Contract {
    fn set_environment(&mut self, environment: &'static rust_runtime::blockchain::Environment) {
        self.environment = Some(environment);
    }

    fn environment(&self) -> &'static rust_runtime::blockchain::Environment {
        self.environment.unwrap()
    }

    fn execute(
        &mut self,
        mut call_data: CallData,
    ) -> Result<rust_runtime::WaBuffer, rust_runtime::error::Error> {
        let selector = call_data.read_selector()?;
        log(&alloc::format!(
            "Selector: {:x} {:x}",
            selector,
            SELECTOR_TRANSFER
        ));
        Contract::execute(self, selector, call_data)
    }

    fn on_deploy(&mut self, call_data: CallData) {}
}
