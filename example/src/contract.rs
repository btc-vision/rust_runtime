use alloc::string::ToString;
use rust_runtime::{ethnum, WaBuffer};

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
impl rust_runtime::contract::ContractTrait for Contract {
    fn set_environment(&mut self, environment: &'static rust_runtime::blockchain::Environment) {
        rust_runtime::log_str(&environment.to_string());
        rust_runtime::log_str(&self.params.name);
        rust_runtime::log_str(&ethnum::u256::MAX.to_string());
        self.environment = Some(environment);
    }

    fn execute(&mut self, buffer: rust_runtime::WaBuffer) -> rust_runtime::WaBuffer {
        WaBuffer::from_bytes(buffer.data())
    }

    fn on_deploy(&mut self, _buffer: WaBuffer) {}
}
