pub struct Cursor {
    inner: &'static [u8],
    pos: usize,
}

impl Cursor {
    pub const fn new(inner: &'static [u8]) -> Cursor {
        Cursor { pos: 0, inner }
    }

    pub fn into_inner(self) -> &'static [u8] {
        self.inner
    }

    pub const fn position(&self) -> usize {
        self.pos
    }

    pub fn read_u32(&mut self) -> u32 {
        let result = u32::from_le_bytes(self.inner[self.pos..self.pos + 4].try_into().unwrap());
        self.pos += 4;
        result
    }
}
