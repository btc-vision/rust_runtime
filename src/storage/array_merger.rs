use core::cell::RefCell;

use alloc::vec::Vec;

use crate::{math::abi::encode_pointer, storage::StorageKey, Context};

use super::StorageValue;
use alloc::rc::Rc;

#[derive(Clone)]
pub struct ArrayMerger {
    context: Rc<RefCell<dyn Context>>,
    parent_key: Vec<u8>,
    pointer: u16,
    default_value: StorageValue,
}

impl ArrayMerger {
    pub fn new(
        context: Rc<RefCell<dyn Context>>,
        parent_key: Vec<u8>,
        pointer: u16,
        default_value: StorageValue,
    ) -> Self {
        Self {
            context,
            parent_key,
            pointer,
            default_value,
        }
    }
    pub fn get<'a>(&mut self, key: &[u8]) -> StorageValue {
        let pointer = self.get_key_hash(key);
        self.context
            .borrow_mut()
            .load(&pointer)
            .unwrap_or(self.default_value.clone())
    }

    pub fn set<'a>(&mut self, key: &[u8], value: StorageValue) {
        let pointer = self.get_key_hash(key);
        self.context.borrow_mut().store(pointer, value);
    }

    pub fn contains_key<'a>(&self, key: &[u8]) -> bool {
        let key = self.get_key_hash(key);
        self.context.borrow_mut().exists(&key)
    }

    fn get_key_hash(&self, key: &[u8]) -> StorageKey {
        let merged: Vec<u8> = self.parent_key.iter().chain(key.iter()).cloned().collect();
        encode_pointer(self.pointer, &merged)
    }
}

impl PartialEq for ArrayMerger {
    fn eq(&self, other: &Self) -> bool {
        self.parent_key.eq(&other.parent_key) && self.pointer.eq(&other.pointer)
    }

    fn ne(&self, other: &Self) -> bool {
        self.parent_key.ne(&other.parent_key) && self.pointer.ne(&other.pointer)
    }
}

impl Eq for ArrayMerger {}
