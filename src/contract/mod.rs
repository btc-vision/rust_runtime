use crate::{blockchain::AddressHash, mem::WaBuffer, types::CallData, Context};

pub mod op_20;

pub trait ContractTrait {
    fn set_environment(&mut self, environment: &'static crate::blockchain::Environment);

    fn environment(&self) -> &'static crate::blockchain::Environment;

    fn context(&self) -> &mut impl crate::env::Context;

    fn is_self(&self, address: &AddressHash) -> bool {
        address.eq(&self.environment().address)
    }

    fn only_deployer(&self, caller: &AddressHash) -> Result<(), crate::error::Error> {
        if self.environment().deployer.ne(caller) {
            Err(crate::error::Error::OnlyOwner)
        } else {
            Ok(())
        }
    }

    fn emit(&mut self, event: &impl crate::event::EventTrait) -> Result<(), crate::error::Error> {
        self.context().emit(event);
        Ok(())
    }

    fn on_deploy(&mut self, _call_data: CallData) {
        self.context().log("On Deploy is not implemented");
    }

    fn execute(&mut self, _call_data: CallData) -> Result<WaBuffer, crate::error::Error> {
        self.context().log("Execute is not implemented");
        unimplemented!("Execute needs to be implemented");
    }
}
