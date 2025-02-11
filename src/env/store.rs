#[allow(unused_imports)]
use crate::{
    storage::{map::Map, StorageKey, StorageValue},
    WaBuffer,
};
use once_cell::sync::Lazy;
use spin::Mutex;

/// For test purposes only: This global storage is used to mock the VM’s load/store behavior.
/// (In production the runtime uses GlobalStore instead.)
#[cfg(not(target_arch = "wasm32"))]
static STORAGE: Lazy<Mutex<Map<StorageKey, StorageValue>>> = Lazy::new(|| Mutex::new(Map::new()));

#[cfg(target_arch = "wasm32")]
pub fn pointer_store(key: &StorageKey, value: &StorageValue) -> Result<bool, crate::error::Error> {
    let mut buffer = WaBuffer::new(64, 1)?;
    let mut cursor = buffer.cursor();

    cursor.write_bytes(key)?;
    cursor.write_bytes(value.bytes())?;

    unsafe {
        WaBuffer::from_raw(super::global::store(buffer.ptr()))
            .cursor()
            .read_bool()
    }
}

/// For unit tests only: Write the key/value pair to our mocked storage.
#[cfg(not(target_arch = "wasm32"))]
pub fn pointer_store(key: &StorageKey, value: &StorageValue) -> Result<bool, crate::error::Error> {
    let mut storage = STORAGE.lock();
    storage.insert(*key, *value);
    Ok(true)
}

#[cfg(target_arch = "wasm32")]
pub fn pointer_load(key: &StorageKey) -> Result<StorageValue, crate::error::Error> {
    let mut buffer = WaBuffer::new(32, 1)?;
    let mut cursor = buffer.cursor();

    cursor.write_bytes(key)?;
    unsafe {
        let value: StorageValue = WaBuffer::from_raw(super::global::load(buffer.ptr()))
            .data()
            .into();
        Ok(value)
    }
}

/// For unit tests only: Read the value from our mocked storage.
#[cfg(not(target_arch = "wasm32"))]
pub fn pointer_load(key: &StorageKey) -> Result<StorageValue, crate::error::Error> {
    let storage = STORAGE.lock();
    Ok(*storage.get(key).unwrap_or(&StorageValue::ZERO))
}

/// For unit tests only: Clear the mocked storage.
#[cfg(not(target_arch = "wasm32"))]
pub fn pointer_storage_reset() {
    let mut storage = STORAGE.lock();
    storage.clear();
}
