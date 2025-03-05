use ethnum::u256;

use crate::{
    blockchain::AddressHash,
    constant::ADDRESS_BYTE_LENGTH,
    cursor::Cursor,
    math::abi::encode_selector_const,
    storage::{
        multi_address_map::MultiAddressMemoryMap,
        stored::{StoredTrait, StoredU256, StoredU8},
        stored_map::StoredMap,
    },
    types::{CallData, Selector},
};

pub struct OP20Params {
    pub max_supply: StoredU256,
    pub decimals: StoredU8,
    pub name: &'static str,
    pub symbol: &'static str,
}

#[repr(u16)]
pub enum Pointer {
    MaxSupply = 1,
    Decimals,
    Name,
    Symbol,
    TotalSupply,
    AllowanceMap,
    BalanceOfMap,
}

impl Pointer {
    pub const fn u16(self) -> u16 {
        self as u16
    }
}

pub const SELECTOR_OWNER: Selector = encode_selector_const("owner");
pub const SELECTOR_DECIMALS: Selector = encode_selector_const("decimals");
pub const SELECTOR_NAME: Selector = encode_selector_const("name");
pub const SELECTOR_SYMBOL: Selector = encode_selector_const("symbol");
pub const SELECTOR_TOTAL_SUPPLY: Selector = encode_selector_const("totalSupply");
pub const SELECTOR_MAXIMUM_SUPPLY: Selector = encode_selector_const("maximumSupply");
pub const SELECTOR_ALLOWANCE: Selector = encode_selector_const("allowance");
pub const SELECTOR_APPROVE: Selector = encode_selector_const("approve");
pub const SELECTOR_BALANCE_OF: Selector = encode_selector_const("balanceOf");
pub const SELECTOR_BURN: Selector = encode_selector_const("burn");
pub const SELECTOR_TRANSFER: Selector = encode_selector_const("transfer");
pub const SELECTOR_TRANSFER_FROM: Selector = encode_selector_const("transferFrom");

pub trait OP20Trait: super::ContractTrait {
    fn execute_base(
        &mut self,
        selector: Selector,
        call_data: CallData,
    ) -> Result<Cursor, crate::error::Error> {
        match selector {
            SELECTOR_OWNER => {
                let mut cursor = Cursor::new(ADDRESS_BYTE_LENGTH);
                cursor.write_address(&self.environment().deployer)?;
                Ok(cursor)
            }
            SELECTOR_DECIMALS => {
                let mut cursor = Cursor::new(1);
                cursor.write_u8(self.decimals())?;
                Ok(cursor)
            }
            SELECTOR_NAME => {
                let name = self.name();
                let mut cursor = Cursor::new(name.len() + 2);
                cursor.write_string_with_len(name)?;
                Ok(cursor)
            }
            SELECTOR_SYMBOL => {
                let symbol = self.symbol();

                let mut cursor = Cursor::new(symbol.len() + 2);
                cursor.write_string_with_len(symbol)?;
                Ok(cursor)
            }
            SELECTOR_TOTAL_SUPPLY => {
                let mut cursor = Cursor::new(32);
                cursor.write_u256_be(&self.total_supply().value())?;
                Ok(cursor)
            }
            SELECTOR_MAXIMUM_SUPPLY => {
                let mut cursor = Cursor::new(32);
                cursor.write_u256_be(&self.max_supply())?;
                Ok(cursor)
            }
            SELECTOR_ALLOWANCE => self.allowance(call_data),
            SELECTOR_APPROVE => self.approve(call_data),
            SELECTOR_BALANCE_OF => self.balance_of(call_data),
            SELECTOR_BURN => self.burn(call_data),
            SELECTOR_TRANSFER => self.transfer(call_data),
            SELECTOR_TRANSFER_FROM => self.transfer_from(call_data),
            _ => Err(crate::error::Error::UnknownSelector),
        }
    }
    fn execute(
        &mut self,
        selector: Selector,
        call_data: crate::types::CallData,
    ) -> Result<Cursor, crate::error::Error> {
        self.execute_base(selector, call_data)
    }

    fn params(&mut self) -> &mut OP20Params;
    fn total_supply(&mut self) -> &mut StoredU256;

    fn max_supply(&mut self) -> u256 {
        self.params().max_supply.value()
    }
    fn decimals(&mut self) -> u8 {
        self.params().decimals.value()
    }

    fn name(&mut self) -> &'static str {
        self.params().name
    }
    fn symbol(&mut self) -> &'static str {
        self.params().symbol
    }

    fn allowance_map(&mut self) -> &mut MultiAddressMemoryMap;
    fn balance_of_map(&mut self) -> &mut StoredMap<AddressHash, u256>;

    fn allowance_base(&mut self, owner: &AddressHash, spender: &AddressHash) -> u256 {
        let mut sender_map = self.allowance_map().get(owner);
        sender_map.get(&spender.bytes).u256()
    }

    fn allowance(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::cursor::Cursor, crate::error::Error> {
        let mut cursor = Cursor::new(32);
        let address_owner = call_data.read_address()?;
        let address_spender = call_data.read_address()?;
        let allowance = self.allowance_base(&address_owner, &address_spender);

        cursor.write_u256_be(&allowance)?;
        Ok(cursor)
    }

    fn approve_base(
        &mut self,
        owner: &AddressHash,
        spender: &AddressHash,
        value: u256,
    ) -> Result<bool, crate::error::Error> {
        if AddressHash::DEAD.eq(owner) {
            return Err(crate::error::Error::DeadAddress);
        }

        if AddressHash::DEAD.eq(spender) {
            return Err(crate::error::Error::DeadAddress);
        }

        let mut sender_map = self.allowance_map().get(owner);
        sender_map.set(&spender.bytes, value.into());

        self.create_approve_event(*owner, *spender, value)?;

        Ok(true)
    }

    fn approve(
        &mut self,
        mut call_data: CallData,
    ) -> Result<crate::cursor::Cursor, crate::error::Error> {
        let owner = self.environment().sender;
        let spender = call_data.read_address()?;
        let amount = call_data.read_u256_be()?;

        let mut cursor = Cursor::new(32);
        cursor.write_bool(self.approve_base(&owner, &spender, amount)?)?;

        Ok(cursor)
    }

    fn balance_of_base(&mut self, address: &AddressHash) -> u256 {
        self.balance_of_map().get(address)
    }

    fn balance_of(
        &mut self,
        mut call_data: crate::types::CallData,
    ) -> Result<crate::cursor::Cursor, crate::error::Error> {
        let mut cursor = Cursor::new(32);
        let address = call_data.read_address()?;
        let balance = self.balance_of_base(&address);
        cursor.write_u256_be(&balance)?;
        Ok(cursor)
    }

    fn burn_base(&mut self, value: u256, only_deployer: bool) -> Result<bool, crate::error::Error> {
        if value.eq(&u256::ZERO) {
            return Err(crate::error::Error::NoTokens);
        }

        if only_deployer {
            self.only_deployer(&self.environment().sender)?;
        }

        let total_supply = self.total_supply().value();
        if total_supply < value {
            return Err(crate::error::Error::InsufficientTotalSupply);
        }

        let sender = self.environment().sender;
        if !self.balance_of_map().contains_key(&sender) {
            return Err(crate::error::Error::NoBalance);
        }

        let balance: u256 = self.balance_of_map().get(&sender);
        if balance < value {
            return Err(crate::error::Error::InsufficientBalance);
        }

        let new_balance = balance - value;
        self.balance_of_map().set(&sender, new_balance);
        let value = self.total_supply().set(total_supply - value);

        self.create_burn_event(value)?;

        Ok(true)
    }

    fn burn(
        &mut self,
        mut call_data: crate::types::CallData,
    ) -> Result<crate::cursor::Cursor, crate::error::Error> {
        let mut cursor = Cursor::new(1);
        let amount = call_data.read_u256_be()?;

        cursor.write_bool(self.burn_base(amount, true)?)?;
        Ok(cursor)
    }

    fn mint_base(
        &mut self,
        to: &AddressHash,
        value: u256,
        only_deployer: bool,
    ) -> Result<bool, crate::error::Error> {
        if only_deployer {
            self.only_deployer(&self.environment().sender)?;
        }

        if !self.balance_of_map().contains_key(to) {
            self.balance_of_map().set(to, value);
        } else {
            let to_balance = self.balance_of_map().get(to);
            self.balance_of_map().set(to, to_balance + value);
        }

        let old = self.total_supply().value();
        let new = old + value;

        if new > self.max_supply() {
            return Err(crate::error::Error::MaxSupplyReached);
        }
        self.total_supply().set(new);

        self.create_mint_event(*to, value)?;

        Ok(true)
    }

    fn transfer_base(
        &mut self,
        to: &AddressHash,
        value: u256,
    ) -> Result<bool, crate::error::Error> {
        let sender = self.environment().sender;
        if self.is_self(&sender) {
            return Err(crate::error::Error::CanNotTransferFromSelfAccount);
        }

        if value == u256::ZERO {
            return Err(crate::error::Error::CannotTransferZeroTokens);
        }

        let balance = self.balance_of_map().get(&sender);

        if balance < value {
            return Err(crate::error::Error::InsufficientBalance);
        }
        let new_balance = balance - value;
        self.balance_of_map().set(&sender, new_balance);

        let balance = self.balance_of_map().get(to);
        let new_balance = balance + value;
        self.balance_of_map().set(to, new_balance);

        self.create_transfer_event(sender, *to, value)?;
        Ok(true)
    }

    fn transfer(
        &mut self,
        mut call_data: crate::types::CallData,
    ) -> Result<crate::cursor::Cursor, crate::error::Error> {
        let mut cursor = Cursor::new(1);
        let address = call_data.read_address()?;
        let amount = call_data.read_u256_be()?;
        let result = self.transfer_base(&address, amount)?;

        cursor.write_bool(result)?;
        Ok(cursor)
    }

    fn spend_allowance(
        &mut self,
        deployer: &AddressHash,
        spender: &AddressHash,
        value: u256,
    ) -> Result<(), crate::error::Error> {
        let mut deployer_allowance_map = self.allowance_map().get(deployer);
        let allowed: u256 = deployer_allowance_map.get(&spender.bytes).u256();

        if allowed < value {
            return Err(crate::error::Error::InsufficientAllowance);
        }

        let new_allowance = allowed - value;
        deployer_allowance_map.set(&spender.bytes, new_allowance.into());
        self.allowance_map().set(*deployer, deployer_allowance_map);
        Ok(())
    }

    fn transfer_from_unsafe(
        &mut self,
        from: &AddressHash,
        to: &AddressHash,
        value: u256,
    ) -> Result<bool, crate::error::Error> {
        let balance: u256 = self.balance_of_map().get(from);
        if balance < value {
            return Err(crate::error::Error::InsufficientBalance);
        }

        let new_balance = balance - value;
        self.balance_of_map().set(from, new_balance);

        if !self.balance_of_map().contains_key(to) {
            self.balance_of_map().set(to, value);
        } else {
            let to_balance: u256 = self.balance_of_map().get(to);
            let new_to_balance = to_balance + value;
            self.balance_of_map().set(to, new_to_balance);
        }

        self.create_transfer_event(*from, *to, value)?;

        Ok(true)
    }

    fn transfer_from_base(
        &mut self,
        from: &AddressHash,
        to: &AddressHash,
        value: u256,
    ) -> Result<bool, crate::error::Error> {
        if AddressHash::DEAD.eq(from) || AddressHash::DEAD.eq(to) {
            return Err(crate::error::Error::DeadAddress);
        }

        self.spend_allowance(from, &self.environment().sender, value)?;
        self.transfer_from_unsafe(from, to, value)?;
        Ok(true)
    }

    fn transfer_from(
        &mut self,
        mut call_data: crate::types::CallData,
    ) -> Result<crate::cursor::Cursor, crate::error::Error> {
        let mut cursor = Cursor::new(1);

        let address_from = call_data.read_address()?;
        let address_to = call_data.read_address()?;
        let amount = call_data.read_u256_be()?;
        cursor.write_bool(self.transfer_from_base(&address_from, &address_to, amount)?)?;

        Ok(cursor)
    }

    fn create_burn_event(&mut self, value: u256) -> Result<(), crate::error::Error> {
        let burn_event = crate::event::Event::burn(value)?;

        self.context().borrow_mut().emit(&burn_event);
        Ok(())
    }

    fn create_approve_event(
        &self,
        deployer: AddressHash,
        spender: AddressHash,
        value: u256,
    ) -> Result<(), crate::error::Error> {
        let approve_event = crate::event::Event::approve(deployer, spender, value)?;
        self.context().borrow_mut().emit(&approve_event);
        Ok(())
    }

    fn create_mint_event(
        &mut self,
        deployer: AddressHash,
        amount: u256,
    ) -> Result<(), crate::error::Error> {
        let mint_event = crate::event::Event::mint(deployer, amount)?;
        self.context().borrow_mut().emit(&mint_event);
        Ok(())
    }

    fn create_transfer_event(
        &mut self,
        from: AddressHash,
        to: AddressHash,
        amount: u256,
    ) -> Result<(), crate::error::Error> {
        let transfer_event = crate::event::Event::transfer(from, to, amount)?;
        self.context().borrow_mut().emit(&transfer_event);
        Ok(())
    }
}
