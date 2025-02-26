use alloc::rc::Rc;
use core::cell::RefCell;

use crate::{blockchain::AddressHash, Context};

use super::{array_merger::ArrayMerger, map::Map, StorageValue};

pub struct MultiAddressMemoryMap {
    context: Rc<RefCell<dyn Context>>,
    pointer: u16,
    default_value: StorageValue,
    pub map: Map<AddressHash, ArrayMerger>,
}

impl MultiAddressMemoryMap {
    pub const fn new(
        context: Rc<RefCell<dyn Context>>,
        pointer: u16,
        default_value: StorageValue,
    ) -> Self {
        Self {
            context,
            pointer,
            default_value,
            map: Map::new(),
        }
    }

    pub fn clear(&mut self) {
        self.map.clear();
    }

    pub fn get(&mut self, key: &AddressHash) -> ArrayMerger {
        self.create_key_merger(key);
        self.map.get(key).unwrap().clone()
    }

    pub fn set(&mut self, key: AddressHash, value: ArrayMerger) {
        self.create_key_merger(&key);
        self.map.insert(key, value);
    }

    pub fn contains_key(&self, key: &AddressHash) -> bool {
        self.map.contains_key(key)
    }

    fn create_key_merger(&mut self, key: &AddressHash) {
        if !self.map.contains_key(key) {
            self.map.push(
                *key,
                ArrayMerger::new(
                    self.context.clone(),
                    key.bytes.to_vec(),
                    self.pointer,
                    self.default_value,
                ),
            );
        }
    }
}
