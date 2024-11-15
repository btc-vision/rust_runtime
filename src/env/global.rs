use crate::mem::WaPtr;

#[link(wasm_import_module = "env")]
extern "C" {
    #[allow(dead_code)]
    pub fn load(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn store(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn deployFromAddress(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn call(ptr: WaPtr) -> WaPtr;
    pub fn log(ptr: WaPtr);
    pub fn emit(ptr: WaPtr);
    #[allow(dead_code)]
    pub fn encodeAddress(ptr: WaPtr) -> WaPtr;
    pub fn sha256(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn ripemd160(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn inputs() -> WaPtr;
    #[allow(dead_code)]
    pub fn outputs() -> WaPtr;
}
