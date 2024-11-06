use alloc::string::ToString;

pub struct Contract<'a> {
    environment: Option<&'a rust_runtime::blockchain::Environment>,
}
impl<'a> Contract<'a> {
    pub const fn new() -> Self {
        Self { environment: None }
    }
}
impl<'a> rust_runtime::contract::ContractTrait for Contract<'a> {
    fn set_environment(&mut self, environment: &'static rust_runtime::blockchain::Environment) {
        rust_runtime::log_str(&environment.to_string());
        self.environment = Some(environment);
    }
}
