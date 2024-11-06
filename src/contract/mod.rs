use crate::mem::WaBuffer;

pub mod op_20;

pub trait ContractTrait {
    fn set_environment(&mut self, environment: &'static crate::blockchain::Environment);
    fn on_deploy(&mut self, _buffer: WaBuffer) {
        crate::log_str("On Deploy is not implemented");
        //unimplemented!("On deploy needs to be implemented");
    }
    fn execute(&mut self, buffer: WaBuffer) -> WaBuffer {
        crate::log_str("Execute is not implemented");
        //unimplemented!("Execute needs to be implemented");
        buffer
    }
}
