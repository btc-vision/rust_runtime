use alloc::rc::Rc;
use core::cell::RefCell;
use rust_runtime::{
    blockchain::AddressHash,
    contract::op_20::Pointer,
    ethnum::u256,
    math::abi::encode_selector_const,
    storage::{
        multi_address_map::MultiAddressMemoryMap,
        stored::{StoredTrait, StoredU256, StoredU8},
        stored_map::StoredMap,
        StorageValue,
    },
    types::{CallData, Selector},
    Context, ContractTrait, OP20Trait,
};

const SELECTOR_AIRDROP: Selector = encode_selector_const("airdrop");
const SELECTOR_AIRDROP_WITH_AMOUNT: Selector = encode_selector_const("airdropWithAmount");
const SELECTOR_MINT: Selector = encode_selector_const("mint");

pub struct Contract<'a> {
    environment: Option<&'a rust_runtime::blockchain::Environment>,
    params: rust_runtime::contract::op_20::OP20Params,
    balance_of_map: StoredMap<AddressHash, u256>,
    allowance_map: MultiAddressMemoryMap,
    total_supply: StoredU256,
    context: Rc<RefCell<dyn Context>>,
}
impl<'a> Contract<'a> {
    pub fn new(context: Rc<RefCell<dyn Context>>) -> Self {
        Self {
            environment: None,
            params: rust_runtime::contract::op_20::OP20Params {
                max_supply: StoredU256::new_const(
                    context.clone(),
                    Pointer::MaxSupply.u16(),
                    u256::new(100000000000000000000000000),
                ),
                decimals: StoredU8::new_const(context.clone(), Pointer::Decimals.u16(), 18),
                name: "MyToken",
                symbol: "TOKEN",
            },
            balance_of_map: StoredMap::new(
                context.clone(),
                Pointer::BalanceOfMap.u16(),
                u256::ZERO,
            ),
            allowance_map: MultiAddressMemoryMap::new(
                context.clone(),
                Pointer::AllowanceMap.u16(),
                StorageValue::ZERO,
            ),
            total_supply: StoredU256::new_const(
                context.clone(),
                Pointer::TotalSupply.u16(),
                u256::ZERO,
            ),
            context,
        }
    }
}

impl<'a> Contract<'a> {
    fn execute(
        &mut self,
        selector: Selector,
        call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        match selector {
            SELECTOR_MINT => self.mint(call_data),
            SELECTOR_AIRDROP => self.airdrop(call_data),
            SELECTOR_AIRDROP_WITH_AMOUNT => self.airdrop_with_amount(call_data),
            _ => OP20Trait::execute_base(self, selector, call_data),
        }
    }

    fn mint(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        self.only_deployer(&self.environment().sender)?;

        let mut response = crate::WaBuffer::new(1, 1)?;
        let mut cursor = response.cursor();
        let address = call_data.read_address()?;
        let amount = call_data.read_u256_be()?;
        cursor.write_bool(self.mint_base(&address, amount, false)?)?;

        return Ok(response);
    }

    fn airdrop(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        self.only_deployer(&self.environment().sender)?;
        let drops = call_data.read_address_value_map()?;
        for (address, amount) in drops.iter() {
            self.mint_base(address, amount.clone(), false)?;
        }

        let mut response = crate::WaBuffer::new(1, 1)?;
        let mut cursor = response.cursor();
        cursor.write_bool(true)?;

        Ok(response)
    }

    fn optimized_mint(
        &mut self,
        address: AddressHash,
        amount: u256,
    ) -> Result<(), rust_runtime::error::Error> {
        self.balance_of_map.set(&address, amount);
        let value = self.total_supply.value() + amount;
        self.total_supply.set_no_commit(value);

        self.create_mint_event(address, amount)?;

        Ok(())
    }

    fn airdrop_with_amount(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        self.only_deployer(&self.environment().sender)?;
        let amount = call_data.read_u256_be()?;
        let amount_of_addresses: u32 = call_data.read_u32_le()?;

        for _ in 0..amount_of_addresses {
            let address = call_data.read_address()?;
            self.optimized_mint(address, amount)?;
        }

        self.total_supply.commit();

        let mut response = crate::WaBuffer::new(1, 1)?;
        let mut cursor = response.cursor();
        cursor.write_bool(true)?;
        Ok(response)
    }
}

impl<'a> rust_runtime::contract::op_20::OP20Trait<'a> for Contract<'a> {
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

impl<'a> rust_runtime::contract::ContractTrait<'a> for Contract<'a> {
    fn set_environment(&mut self, environment: &'a rust_runtime::blockchain::Environment) {
        self.environment = Some(environment);
    }

    fn environment(&self) -> &'a rust_runtime::blockchain::Environment {
        self.environment.unwrap()
    }

    fn context(&self) -> Rc<RefCell<dyn rust_runtime::env::Context>> {
        self.context.clone()
    }

    fn execute(
        &mut self,
        mut call_data: CallData,
    ) -> Result<rust_runtime::WaBuffer, rust_runtime::error::Error> {
        let selector = call_data.read_selector()?;

        Contract::execute(self, selector, call_data)
    }

    fn on_deploy(&mut self, _call_data: CallData) {}
}

// To run the tests, run `cargo test -p example` in the root of the workspace
#[cfg(test)]
mod tests {
    use core::cell::RefCell;

    use crate::contract::SELECTOR_MINT;
    use alloc::{rc::Rc, vec::Vec};
    use rust_runtime::{
        contract::op_20::{SELECTOR_BALANCE_OF, SELECTOR_NAME, SELECTOR_TOTAL_SUPPLY},
        ethnum::u256,
        storage::map::Map,
        tests::{execute, execute_address, execute_address_amount, random_environment},
    };

    fn context() -> Rc<RefCell<rust_runtime::env::TestContext>> {
        Rc::new(RefCell::new(rust_runtime::env::TestContext::new(
            rust_runtime::Network::Mainnet,
            Map::new(),
            Vec::new(),
            Vec::new(),
        )))
    }

    #[test]
    fn test_contract_name() {
        let context = context();
        let mut contract = super::Contract::new(context);
        let mut cursor = execute(&mut contract, SELECTOR_NAME);
        assert_eq!(contract.params.name, cursor.read_string_with_len().unwrap());
    }

    #[test]
    fn test_contract_mint() {
        let context = context();
        let mut contract = super::Contract::new(context);

        let address = rust_runtime::tests::random_address();
        contract.environment = rust_runtime::blockchain::Environment {
            deployer: address.clone(),
            sender: address.clone(),
            ..random_environment()
        }
        .leak();
        let amount = u256::new(10000000);

        let mut cursor = execute_address(&mut contract, SELECTOR_BALANCE_OF, &address);
        assert_eq!(cursor.read_u256_be().unwrap(), 0);

        for _ in 0..3 {
            execute_address_amount(&mut contract, SELECTOR_MINT, &address, amount);
        }

        let mut cursor = execute_address(&mut contract, SELECTOR_BALANCE_OF, &address);
        assert_eq!(cursor.read_u256_be().unwrap(), 3 * amount);

        execute_address_amount(&mut contract, SELECTOR_MINT, &address, amount); // mint more

        let mut cursor = execute_address(&mut contract, SELECTOR_BALANCE_OF, &address);
        assert_eq!(cursor.read_u256_be().unwrap(), 4 * amount);
    }

    #[test]
    fn test_contract_total_supply() {
        let context = context();
        let mut contract = super::Contract::new(context);

        let address = rust_runtime::tests::random_address();

        contract.environment = rust_runtime::blockchain::Environment {
            deployer: address.clone(),
            sender: address.clone(),
            ..random_environment()
        }
        .leak();
        let amount = u256::new(10000000);

        let mut cursor = execute(&mut contract, SELECTOR_TOTAL_SUPPLY);
        assert_eq!(cursor.read_u256_be().unwrap(), 0);

        for _ in 0..3 {
            execute_address_amount(&mut contract, SELECTOR_MINT, &address, amount);
        }

        let mut cursor = execute(&mut contract, SELECTOR_TOTAL_SUPPLY);
        assert_eq!(cursor.read_u256_be().unwrap(), 3 * amount);

        execute_address_amount(&mut contract, SELECTOR_MINT, &address, amount); // mint more

        let mut cursor = execute(&mut contract, SELECTOR_TOTAL_SUPPLY);
        assert_eq!(cursor.read_u256_be().unwrap(), 4 * amount);
    }
}
