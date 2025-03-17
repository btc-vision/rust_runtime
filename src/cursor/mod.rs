use core::alloc::Layout;

use ::alloc::alloc::alloc;

use crate::{AsWaMutPtr, AsWaPtr, AsWaSize};

pub mod reader;
pub mod writer;

pub struct Cursor {
    inner: &'static mut [u8],
    reader: usize,
    writer: usize,
}

impl Clone for Cursor {
    fn clone(&self) -> Self {
        Cursor::from_ptr(self.as_wa_ptr(), self.inner.len())
    }
}

impl Cursor {
    pub fn new(size: usize) -> Cursor {
        unsafe {
            let layout = Layout::from_size_align_unchecked(size, 1);
            Cursor {
                inner: core::slice::from_raw_parts_mut(alloc(layout), size),
                reader: 0,
                writer: 0,
            }
        }
    }

    pub fn from_ptr(ptr: u32, size: usize) -> Cursor {
        unsafe {
            Cursor {
                inner: core::slice::from_raw_parts_mut(ptr as *mut u8, size),
                reader: 0,
                writer: 0,
            }
        }
    }
    pub fn from_slice(inner: &'static mut [u8]) -> Cursor {
        Cursor {
            reader: 0,
            writer: 0,
            inner,
        }
    }

    pub fn into_inner(self) -> &'static [u8] {
        self.inner
    }

    pub fn read_pos(&self) -> usize {
        self.reader
    }

    pub fn write_pos(&self) -> usize {
        self.writer
    }

    pub fn reset(&mut self) {
        self.reader = 0;
        self.writer = 0;
    }

    pub fn size(&self) -> usize {
        self.inner.len()
    }
}

impl AsWaPtr for Cursor {
    fn as_wa_ptr(&self) -> u32 {
        self.inner.as_ptr() as u32
    }
}

impl AsWaMutPtr for Cursor {
    fn as_wa_mut_ptr(&mut self) -> u32 {
        self.inner.as_mut_ptr() as u32
    }
}

impl AsWaSize for Cursor {
    fn as_wa_size(&self) -> u32 {
        self.inner.len() as u32
    }
}

#[cfg(test)]
mod tests {
    use crate::U256;

    #[test]
    fn test_reader() -> Result<(), crate::error::Error> {
        let mem = alloc::boxed::Box::new([0; 256]);
        let mut cursor = super::Cursor::from_slice(alloc::boxed::Box::leak(mem));

        cursor.write_u8(1)?;
        cursor.write_u16(&2, true)?;
        cursor.write_u32(&3, true)?;
        cursor.write_u64(&4, true)?;
        cursor.write_u128(&5, true)?;
        cursor.write_u256(&U256::from(6), true)?;

        assert_eq!(cursor.read_u8()?, 1);
        assert_eq!(cursor.read_u16(true)?, 2);
        assert_eq!(cursor.read_u32(true)?, 3);
        assert_eq!(cursor.read_u64(true)?, 4);
        assert_eq!(cursor.read_u128(true)?, 5);
        assert_eq!(cursor.read_u256(true)?, U256::from(6));

        Ok(())
    }
}
