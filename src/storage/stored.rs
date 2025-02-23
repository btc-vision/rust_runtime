use ethnum::u256;

use super::{StorageKey, StorageValue};
use crate::{blockchain::AddressHash, math::abi::encode_pointer, Context};
use core::convert::Into;

pub trait StoredTrait<T, D>
where
    D: Into<T>,
{
    fn value<'a>(&mut self, context: &mut impl Context<'a>) -> T;
    fn refresh<'a>(&mut self, context: &mut impl Context<'a>) -> T;
    fn set<'a>(&mut self, context: &mut impl Context<'a>, value: T) -> T;
    fn set_no_commit(&mut self, value: T) -> T;
    fn commit<'a>(&mut self, context: &mut impl Context<'a>);
}

pub struct Stored<T, D>
where
    T: Into<StorageValue> + Copy + Eq,
    StorageValue: Into<T>,
    D: Into<T> + Clone,
{
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
    fn value<'a>(&mut self, context: &mut impl Context<'a>) -> T {
        if let Some(value) = &self.value {
            *value
        } else {
            self.value = Some(
                context
                    .load(
                        &self.pointer,
                        Into::<StorageValue>::into(self.default_value.clone().into()),
                    )
                    .into(),
            );
            self.value.as_ref().unwrap().clone()
        }
    }

    fn set<'a>(&mut self, context: &mut impl Context<'a>, value: T) -> T {
        if Some(value) != self.value {
            context.store(self.pointer, value.into());
            self.value = Some(value);
            value
        } else {
            value
        }
    }

    fn refresh<'a>(&mut self, context: &impl Context<'a>) -> T {
        let value = context.load(
            &self.pointer,
            Into::<StorageValue>::into(self.default_value.clone().into()),
        );
        self.value = Some(value.clone().into());
        self.value.unwrap()
    }

    fn set_no_commit(&mut self, value: T) -> T {
        self.value = Some(value);
        value
    }

    fn commit<'a>(&mut self, context: &mut impl Context<'a>) {
        if let Some(value) = self.value {
            context.store(self.pointer, value.into());
        }
    }
}

impl<T, D> Stored<T, D>
where
    T: Into<StorageValue> + Copy + Eq,
    StorageValue: Into<T>,
    D: Into<T> + Clone,
{
    pub const fn new_const(pointer: u16, default_value: D) -> Self {
        Self {
            pointer: crate::math::abi::encode_pointer_const(pointer),
            default_value,
            value: None,
        }
    }

    pub fn new(pointer: u16, sub_pointer: &StorageKey, default_value: D) -> Self {
        Self {
            pointer: encode_pointer(pointer, sub_pointer),
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

    use alloc::vec::Vec;
    use ethnum::u256;

    use crate::storage::Map;
    use crate::TestContext;

    use super::StoredTrait;

    fn context() -> TestContext {
        TestContext::new(
            crate::env::Network::Testnet,
            Map::new(),
            Vec::new(),
            Vec::new(),
        )
    }

    #[test]
    fn test_bool() {
        let mut stored_bool = super::StoredBool::new_const(0, false);
        let mut context = context();
        stored_bool.set(&mut context, true);
        assert_eq!(stored_bool.refresh(&mut context), true)
    }

    #[test]
    fn test_u8() {
        let mut context = context();
        let mut stored_u8 = super::StoredU8::new_const(0, 0);
        stored_u8.set(&mut context, 1);
        assert_eq!(stored_u8.refresh(&mut context), 1)
    }

    #[test]
    fn test_u16() {
        let mut context = context();
        let mut stored_u16 = super::StoredU16::new_const(0, 0);
        stored_u16.set(&mut context, 123);
        assert_eq!(stored_u16.refresh(&mut context), 123)
    }

    #[test]
    fn test_u32() {
        let mut context = context();
        let mut stored_u32 = super::StoredU32::new_const(0, 0);
        stored_u32.set(&mut context, 123);
        assert_eq!(stored_u32.refresh(&mut context), 123)
    }

    #[test]
    fn test_u64() {
        let mut context = context();
        let mut stored_u64 = super::StoredU64::new_const(0, 0);
        stored_u64.set(&mut context, 123);
        assert_eq!(stored_u64.refresh(&mut context), 123)
    }

    #[test]
    fn test_u128() {
        let mut context = context();
        let mut stored_u128 = super::StoredU128::new_const(0, 0);
        stored_u128.set(&mut context, 123);
        assert_eq!(stored_u128.refresh(&mut context), 123)
    }

    #[test]
    fn test_u256() {
        let mut context = context();
        let mut stored_u256 = super::StoredU256::new_const(0, u256::new(0));
        stored_u256.set(&mut context, u256::new(123));
        assert_eq!(stored_u256.refresh(&mut context), u256::new(123))
    }
}
