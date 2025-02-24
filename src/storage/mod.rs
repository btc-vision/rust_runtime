
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

/*
static GLOBAL_STORE: Lazy<Mutex<Map<StorageKey, StorageValue>>> =
    Lazy::new(|| Mutex::new(Map::new()));

pub struct GlobalStore {}

impl GlobalStore {
    pub fn get(key: &StorageKey, default_value: StorageValue) -> StorageValue {
        let mut store = GLOBAL_STORE.lock();
        if store.contains_key(key) {
            *store.get(key).unwrap()
        } else {
            match crate::env::pointer_load(key) {
                Ok(result) => {
                    if result == StorageValue::ZERO && default_value != StorageValue::ZERO {
                        store.insert(key.clone(), default_value);
                        default_value
                    } else {
                        store.insert(key.clone(), result);
                        result
                    }
                }
                Err(_) => default_value,
            }
        }
    }

    pub fn set(key: StorageKey, value: StorageValue) {
        assert!(crate::env::pointer_store(&key, &value).unwrap());
        let mut store = GLOBAL_STORE.lock();
        store.insert(key, value);
    }

    pub fn has_key(key: &StorageKey) -> bool {
        let mut store = GLOBAL_STORE.lock();
        if store.contains_key(key) {
            true
        } else {
            match crate::env::pointer_load(key) {
                Ok(result) => {
                    store.insert(key.clone(), result);
                    !result.zero()
                }
                Err(_) => false,
            }
        }
    }
}
     */
