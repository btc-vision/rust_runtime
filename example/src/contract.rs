use rust_runtime::{
    constant::ADDRESS_BYTE_LENGTH,
    cursor, ethnum,
    math::abi::encode_selector_static,
    types::{CallData, Selector},
    ContractTrait, OP20Trait, WaBuffer,
};

/*
const SELECTOR: [u8; 32] = sha2_const::Sha256::new()
    .update("abcd".as_bytes())
    .finalize();
 */

pub struct Contract {
    environment: Option<&'static rust_runtime::blockchain::Environment>,
    params: rust_runtime::contract::op_20::OP20Params,
}
impl Contract {
    pub const fn new() -> Self {
        Self {
            environment: None,
            params: rust_runtime::contract::op_20::OP20Params {
                max_supply: rust_runtime::ethnum::uint!("2_100_000_000_000_000"),
                decimals: 8,
                name: "Moto",
                symbol: "MOTO",
            },
        }
    }
}

impl Contract {
    fn execute(
        &self,
        selector: Selector,
        mut call_data: CallData,
    ) -> Result<crate::WaBuffer, rust_runtime::error::Error> {
        OP20Trait::execute(self, selector, call_data)
    }
}

impl rust_runtime::contract::op_20::OP20Trait for Contract {}

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
        //rust_runtime::contract::op_20::OP20Trait::approve(call_data)
        let selector = call_data.read_selector()?;

        Ok(match selector {
            _ => Contract::execute(self, selector, call_data)?,
        })
    }

    fn on_deploy(&mut self, call_data: CallData) {}
}

/*
impl rust_runtime::contract::op_20::OP20Trait for Contract {

}
 */
