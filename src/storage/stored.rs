use ethnum::u256;

use super::{GlobalStore, StorageKey, StorageValue};
use crate::{blockchain::AddressHash, math::abi::encode_pointer};
use core::convert::Into;

pub trait StoredTrait<T, D>
where
    D: Into<T>,
{
    fn value(&mut self) -> T;
    fn set(&mut self, value: T) -> T;
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
    fn value(&mut self) -> T {
        if let Some(value) = &self.value {
            *value
        } else {
            self.value = Some(
                GlobalStore::get(
                    &self.pointer,
                    Into::<StorageValue>::into(self.default_value.clone().into()),
                )
                .into(),
            );
            self.default_value.clone().into()
        }
    }

    fn set(&mut self, value: T) -> T {
        if Some(value) != self.value {
            GlobalStore::set(self.pointer, value.into());
            self.value = Some(value);
            value
        } else {
            value
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

    use ethnum::u256;
    #[test]
    fn test_u256() {
        let stored_u256 = super::StoredU256::new_const(0, u256::new(0));
    }
}
