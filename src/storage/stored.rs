use ethnum::u256;

use super::{StorageKey, StorageValue};
use crate::{blockchain::AddressHash, math::abi::encode_pointer, Context};
use alloc::rc::Rc;
use core::{cell::RefCell, convert::Into};

pub trait StoredTrait<T, D>
where
    D: Into<T>,
{
    fn value<'a>(&mut self) -> T;
    fn refresh<'a>(&mut self) -> T;
    fn set<'a>(&mut self, value: T) -> T;
    fn set_no_commit(&mut self, value: T) -> T;
    fn commit<'a>(&mut self);
}

pub struct Stored<T, D>
where
    T: Into<StorageValue> + Copy + Eq,
    StorageValue: Into<T>,
    D: Into<T> + Clone,
{
    context: Rc<dyn Context>,
    pointer: StorageKey,
    default_value: D,
    value: Option<T>,
}

impl<T, D> StoredTrait<T, D> for Stored<T, D>
where
    T: Into<StorageValue> + Copy + Eq,
    StorageValue: Into<T>,
    D: Into<T> + Clone,
{
    fn value(&mut self) -> T {
        if let Some(value) = &self.value {
            *value
        } else {
            let value: T = self
                .context
                .load(&self.pointer)
                .map(|value| value.into())
                .unwrap_or(self.default_value.clone().into());

            self.value = Some(value);
            value
        }
    }

    fn set(&mut self, value: T) -> T {
        if Some(value) != self.value {
            self.context.store(self.pointer, value.into());
            self.value = Some(value);
            value
        } else {
            value
        }
    }

    fn refresh(&mut self) -> T {
        let value: T = self
            .context
            .load(&self.pointer)
            .map(|value| value.into())
            .unwrap_or(self.default_value.clone().into());
        self.value = Some(value);
        value
    }

    fn set_no_commit(&mut self, value: T) -> T {
        self.value = Some(value);
        value
    }

    fn commit(&mut self) {
        if let Some(value) = self.value {
            self.context.store(self.pointer, value.into());
        }
    }
}

impl<T, D> Stored<T, D>
where
    T: Into<StorageValue> + Copy + Eq,
    StorageValue: Into<T>,
    D: Into<T> + Clone,
{
    pub const fn new_const(context: Rc<dyn Context>, pointer: u16, default_value: D) -> Self {
        Self {
            context,
            pointer: crate::math::abi::encode_pointer_const(pointer),
            default_value,
            value: None,
        }
    }

    pub fn new(
        context: Rc<dyn Context>,
        pointer: u16,
        sub_pointer: &StorageKey,
        default_value: D,
    ) -> Self {
        Self {
            context,
            pointer: encode_pointer(pointer, &sub_pointer.0),
            default_value,
            value: None,
        }
    }
}

pub type StoredBool = Stored<bool, bool>;
pub type StoredU8 = Stored<u8, u8>;
pub type StoredU16 = Stored<u16, u16>;
pub type StoredU32 = Stored<u32, u32>;
pub type StoredU64 = Stored<u64, u64>;
pub type StoredU128 = Stored<u128, u128>;
pub type StoredU256 = Stored<u256, u256>;
pub type StoredAddress = Stored<AddressHash, AddressHash>;

#[cfg(test)]
mod tests {
    use crate::Context;
    use crate::TestContext;
    use alloc::rc::Rc;
    use ethnum::u256;

    use super::StoredTrait;

    fn context() -> Rc<dyn Context> {
        Rc::new(TestContext::default())
    }

    #[test]
    fn test_bool() {
        let mut stored_bool = super::StoredBool::new_const(context(), 0, false);
        stored_bool.set(true);
        assert_eq!(stored_bool.refresh(), true)
    }

    #[test]
    fn test_u8() {
        let mut stored_u8 = super::StoredU8::new_const(context(), 0, 0);
        stored_u8.set(1);
        assert_eq!(stored_u8.refresh(), 1)
    }

    #[test]
    fn test_u16() {
        let mut stored_u16 = super::StoredU16::new_const(context(), 0, 0);
        stored_u16.set(123);
        assert_eq!(stored_u16.refresh(), 123)
    }

    #[test]
    fn test_u32() {
        let mut stored_u32 = super::StoredU32::new_const(context(), 0, 0);
        stored_u32.set(123);
        assert_eq!(stored_u32.refresh(), 123)
    }

    #[test]
    fn test_u64() {
        let mut stored_u64 = super::StoredU64::new_const(context(), 0, 0);
        stored_u64.set(123);
        assert_eq!(stored_u64.refresh(), 123)
    }

    #[test]
    fn test_u128() {
        let mut stored_u128 = super::StoredU128::new_const(context(), 0, 0);
        stored_u128.set(123);
        assert_eq!(stored_u128.refresh(), 123)
    }

    #[test]
    fn test_u256() {
        let mut stored_u256 = super::StoredU256::new_const(context(), 0, u256::new(0));
        stored_u256.set(u256::new(123));
        assert_eq!(stored_u256.refresh(), u256::new(123))
    }
}
