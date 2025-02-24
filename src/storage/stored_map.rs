use core::{cell::RefCell, marker::PhantomData};
use ethnum::u256;

use crate::{blockchain::AddressHash, math::abi::encode_pointer, Context};

use super::{StorageKey, StorageValue};
use alloc::rc::Rc;

pub struct StoredMap<K, V>
where
    K: Into<StorageKey>,
    V: Into<StorageValue>,
{
    context: Rc<RefCell<dyn Context>>,
    default: V,
    pointer: u16,
    k: PhantomData<K>,
    v: PhantomData<V>,
}

impl<K, V> StoredMap<K, V>
where
    K: Into<StorageKey> + Copy,
    V: Into<StorageValue> + From<StorageValue> + Clone,
{
    pub const fn new(context: Rc<RefCell<dyn Context>>, pointer: u16, default: V) -> Self {
        Self {
            context,
            default,
            pointer,
            k: PhantomData,
            v: PhantomData,
        }
    }

    pub fn set(&self, key: &K, value: V) {
        let key: StorageKey = (*key).into();
        let key_hash = encode_pointer(self.pointer, &key);
        let value = Into::<StorageValue>::into(value);
        self.context.borrow_mut().store(key_hash, value);
    }

    pub fn get(&self, key: &K, default_value: V) -> V {
        let key: StorageKey = (*key).into();
        let key_hash = encode_pointer(self.pointer, &key);
        self.context
            .borrow_mut()
            .load(&key_hash)
            .map(|value| V::from(value))
            .unwrap_or_else(|| default_value)
    }

    pub fn contains_key(&self, key: &K) -> bool {
        let key: StorageKey = (*key).into();
        let key_hash = encode_pointer(self.pointer, &key);
        let has = self.context.borrow_mut().exists(&key_hash);
        has
    }
}

pub type StoredAddresValueMap = StoredMap<AddressHash, u256>;
