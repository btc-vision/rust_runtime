use map::Map;

pub mod array_merger;
pub mod key;
pub mod map;
pub mod multi_address_map;
pub mod stored;
pub mod stored_map;
pub mod stored_string;
pub mod value;

pub use key::StorageKey;
pub use value::StorageValue;

static mut GLOBAL_STORE: Map<StorageKey, StorageValue> = Map::new();

pub struct GlobalStore {}

impl GlobalStore {
    pub fn get(key: &[u8; 32], default_value: StorageValue) -> StorageValue {
        Self::ensure_key(key, default_value);

        if Self::has_key(key) {
            unsafe {
                if let Some(value) = GLOBAL_STORE.get(key) {
                    value.clone()
                } else {
                    default_value
                }
            }
        } else {
            default_value
        }
    }

    pub fn set(key: StorageKey, value: StorageValue) {
        if let Ok(true) = crate::env::pointer_store(&key, &value) {
            unsafe {
                GLOBAL_STORE.insert(key, value);
            }
        }
    }

    fn has_key(key: &StorageKey) -> bool {
        unsafe {
            if GLOBAL_STORE.contains_key(key) {
                true;
            };

            if let Ok(result) = crate::env::pointer_load(key) {
                GLOBAL_STORE.push(key.clone(), result);
                return !result.zero();
            }
        }

        return false;
    }

    fn ensure_key(key: &StorageKey, default_value: StorageValue) {
        if Self::has_key(key) {
            return;
        }

        if default_value.zero() {
            return;
        }

        Self::set(key.clone(), default_value);
    }
}
