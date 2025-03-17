use alloc::rc::Rc;
use core::{cell::RefCell, ops::Add};
use rust_runtime::{
    contract::op_20::Pointer,
    math::abi::encode_selector_const,
    storage::{
        map::Map,
        multi_address_map::MultiAddressMemoryMap,
        stored::{StoredTrait, StoredU256, StoredU8},
        stored_map::{StoredAddressValueMap, StoredMap},
        StorageValue,
    },
    types::{CallData, Selector},
    AddressHash, Context, ContractTrait, Cursor, Environment, OP20Trait, U256,
};

pub struct Contract {
    context: Rc<dyn Context>,
}
impl Contract {
    pub fn new(context: Rc<dyn Context>) -> Self {
        Self { context }
    }
}

impl Contract {
    fn execute(
        &mut self,
        _selector: Selector,
        mut _call_data: CallData,
    ) -> Result<rust_runtime::cursor::Cursor, rust_runtime::error::Error> {
        Ok(Cursor::new(0))
    }
}

impl rust_runtime::contract::ContractTrait for Contract {
    fn context(&self) -> Rc<dyn rust_runtime::env::Context> {
        self.context.clone()
    }

    fn execute(
        &mut self,
        mut call_data: CallData,
    ) -> Result<rust_runtime::cursor::Cursor, rust_runtime::error::Error> {
        let selector = call_data.read_selector()?;

        Contract::execute(self, selector, call_data)
    }

    fn on_deploy(&mut self, _call_data: CallData) -> Result<u32, rust_runtime::error::Error> {
        Ok(0)
    }
}

// To run the tests, run `cargo test -p example` in the root of the workspace
#[cfg(test)]
mod tests {
    use alloc::rc::Rc;
    use core::cell::RefCell;
    use rust_runtime::{
        cursor::Cursor,
        tests::{execute, execute_address, execute_address_amount},
        OP20Trait, U256,
    };
}
