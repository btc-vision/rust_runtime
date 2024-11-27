use crate::{blockchain::AddressHash, cursor, mem::WaBuffer, types::CallData};

pub mod op_20;

static mut INPUTS: Option<u8> = None;
static mut OUTPUTS: Option<u8> = None;

pub trait ContractTrait {
    fn set_environment(&mut self, environment: &'static crate::blockchain::Environment);

    fn environment(&self) -> &'static crate::blockchain::Environment;

    fn is_self(&self, address: &AddressHash) -> bool {
        address.eq(&self.environment().address)
    }

    fn only_owner(&self, caller: &AddressHash) -> Result<(), crate::error::Error> {
        if self.environment().owner.ne(caller) {
            Err(crate::error::Error::OnlyOwner)
        } else {
            Ok(())
        }
    }

    fn emit(event: &impl crate::event::EventTrait) -> Result<(), crate::error::Error> {
        crate::env::emit(event.buffer());
        Ok(())
    }

    fn on_deploy(&mut self, call_data: CallData) {
        crate::log("On Deploy is not implemented");
    }

    fn execute(&mut self, mut call_data: CallData) -> Result<WaBuffer, crate::error::Error> {
        crate::log("Execute is not implemented");
        unimplemented!("Execute needs to be implemented");
    }
}
