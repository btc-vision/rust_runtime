#[cfg(target_arch = "wasm32")]
use crate::mem::WaPtr;
use crate::storage::map::Map;

#[cfg(target_arch = "wasm32")]
#[link(wasm_import_module = "env")]
extern "C" {
    #[allow(dead_code)]
    pub fn load(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn store(ptr: WaPtr) -> WaPtr;

    #[allow(dead_code)]
    pub fn nextPointerGreaterThan(ptr: WaPtr) -> WaPtr;

    #[allow(dead_code)]
    pub fn deploy(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn deployFromAddress(ptr: WaPtr) -> WaPtr;

    #[allow(dead_code)]
    pub fn call(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn log(ptr: WaPtr);
    #[allow(dead_code)]
    pub fn emit(ptr: WaPtr);
    #[allow(dead_code)]
    pub fn encodeAddress(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn validateBitcoinAddress(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn verifySchnorrSignature(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn sha256(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn ripemd160(ptr: WaPtr) -> WaPtr;
    #[allow(dead_code)]
    pub fn inputs() -> WaPtr;
    #[allow(dead_code)]
    pub fn outputs() -> WaPtr;
}

#[cfg(target_arch = "wasm32")]
pub struct GlobalContext {
    store: Map<StorageKey, StorageValue>,
}

#[cfg(target_arch = "wasm32")]
impl GlobalContext {
    pub const fn new() {
        Self { store: Map::new() }
    }
}

#[cfg(target_arch = "wasm32")]
impl super::Context for GlobalContext {
    fn log(&self, text: &str) {
        unsafe {
            if let Ok(string) = WaBuffer::from_str(text) {
                log(string.ptr());
            }
        }
    }

    fn emit(buffer: crate::WaBuffer) {
        unsafe { emit(buffer.ptr()) }
    }
}

#[cfg(target_arch = "wasm32")]
pub static GLOBAL_METHODS: GlobalMethods = GlobalMethods::new();
