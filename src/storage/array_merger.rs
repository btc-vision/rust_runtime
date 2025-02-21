use alloc::vec::Vec;

use crate::{math::abi::encode_pointer, storage::StorageKey, Context};

use super::StorageValue;

#[derive(Clone, Eq, PartialEq)]
pub struct ArrayMerger {
    parent_key: Vec<u8>,
    pointer: u16,
    default_value: StorageValue,
}

impl ArrayMerger {
    pub fn new(parent_key: Vec<u8>, pointer: u16, default_value: StorageValue) -> Self {
        Self {
            parent_key,
            pointer,
            default_value,
        }
    }
    pub fn get<'a>(&mut self, context: &mut impl Context<'a>, key: &[u8]) -> StorageValue {
        let pointer = self.get_key_hash(key);
        context.load(&pointer, self.default_value)
    }

    pub fn set<'a>(&mut self, context: &mut impl Context<'a>, key: &[u8], value: StorageValue) {
        let pointer = self.get_key_hash(key);
        context.store(pointer, value);
    }

    pub fn contains_key<'a>(&self, context: &mut impl Context<'a>, key: &[u8]) -> bool {
        let key = self.get_key_hash(key);
        context.exists(&key)
    }

    fn get_key_hash(&self, key: &[u8]) -> StorageKey {
        let merged: Vec<u8> = self.parent_key.iter().chain(key.iter()).cloned().collect();
        encode_pointer(self.pointer, &merged)
    }
}
