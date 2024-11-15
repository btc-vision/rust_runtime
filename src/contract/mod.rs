use crate::{blockchain::Address, cursor, mem::WaBuffer, types::CallData};

pub mod op_20;

static mut INPUTS: Option<u8> = None;
static mut OUTPUTS: Option<u8> = None;

pub trait ContractTrait {
    fn set_environment(&mut self, environment: &'static crate::blockchain::Environment);

    fn environment(&self) -> &'static crate::blockchain::Environment;

    fn address(&self) -> Address {
        self.environment().address.clone()
    }

    fn owner(&self) -> Address {
        self.environment().owner
    }

    fn emit(event: &impl crate::event::EventTrait) -> Result<(), crate::error::Error> {
        crate::env::emit(event.buffer());
        Ok(())
    }

    fn on_deploy(&mut self, call_data: CallData) {
        crate::log("On Deploy is not implemented");
        //unimplemented!("On deploy needs to be implemented");
    }

    fn execute(&mut self, mut call_data: CallData) -> Result<WaBuffer, crate::error::Error> {
        let selector = call_data.read_selector()?;
        crate::log("Execute is not implemented");
        WaBuffer::new(0, 0).ptr();
        unimplemented!("Execute needs to be implemented");
    }
}
