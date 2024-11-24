use ethnum::U256;

use crate::WaBuffer;

pub fn pointer_store(key: &U256, value: &U256) -> Result<bool, crate::error::Error> {
    let mut buffer = WaBuffer::new(64, 1);
    let mut cursor = buffer.cursor();

    cursor.write_u256_le(&key)?;
    cursor.write_u256_le(&value)?;

    unsafe {
        WaBuffer::from_raw(super::global::store(buffer.ptr()))
            .cursor()
            .read_bool()
    }
}

pub fn pointer_load(key: &U256) -> Result<U256, crate::error::Error> {
    let mut buffer = WaBuffer::new(32, 1);
    let mut cursor = buffer.cursor();

    cursor.write_u256_le(&key)?;
    unsafe {
        WaBuffer::from_raw(super::global::load(buffer.ptr()))
            .cursor()
            .read_u256_le()
    }
}

//pub fn pointer_next_value_greater_than()
