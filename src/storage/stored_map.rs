use core::marker::PhantomData;
use ethnum::u256;

use crate::{blockchain::AddressHash, math::abi::encode_pointer, Context};

use super::{StorageKey, StorageValue};

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

    pub fn set<'a>(&self, context: &mut impl Context<'a>, key: &K, value: V) {
        let key: StorageKey = (*key).into();
        let key_hash = encode_pointer(self.pointer, &key);
        let value = Into::<StorageValue>::into(value);
        context.store(key_hash, value);
    }

    pub fn get<'a>(
        &self,
        context: &mut impl Context<'a>,
        key: &K,
        default_value: V,
    ) -> StorageValue {
        let key: StorageKey = (*key).into();
        let key_hash = encode_pointer(self.pointer, &key);
        let value = context.load(&key_hash, default_value.into());
        value
    }

    pub fn contains_key<'a>(&self, context: &mut impl Context<'a>, key: &K) -> bool {
        let key: StorageKey = (*key).into();
        let key_hash = encode_pointer(self.pointer, &key);
        let has = context.exists(&key_hash);
        has
    }
}

pub type StoredAddresValueMap = StoredMap<AddressHash, u256>;
