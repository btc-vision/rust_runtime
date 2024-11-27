use core::marker::PhantomData;

use ethnum::u256;

use crate::{blockchain::AddressHash, math::abi::encode_pointer};

use super::{GlobalStore, StorageKey, StorageValue};

pub struct StoredMap<K, V>
where
    K: Into<StorageKey>,
    V: Into<StorageValue>,
{
    pointer: u16,
    k: PhantomData<K>,
    v: PhantomData<V>,
}

impl<K, V> StoredMap<K, V>
where
    K: Into<StorageKey> + Copy,
    V: Into<StorageValue> + Clone,
{
    pub const fn new(pointer: u16) -> Self {
        Self {
            pointer,
            k: PhantomData,
            v: PhantomData,
        }
    }

    pub fn set(&self, key: &K, value: V) {
        let key = encode_pointer(self.pointer, &(*key).into());
        GlobalStore::set(key, Into::<StorageValue>::into(value.clone()));
    }

    pub fn get(&self, key: &K, default_value: V) -> StorageValue {
        let key = encode_pointer(self.pointer, &(*key).into());

        GlobalStore::get(&key, default_value.into())
    }

    pub fn contains_key(&self, key: &K) -> bool {
        let key = encode_pointer(self.pointer, &(*key).into());
        GlobalStore::has_key(&key)
    }
}

pub type StoredAddresValueMap = StoredMap<AddressHash, u256>;
