pub mod reader;
pub mod writer;

pub struct Cursor {
    inner: &'static mut [u8],
    pos: usize,
}

impl Cursor {
    pub fn new(inner: &'static mut [u8]) -> Cursor {
        Cursor { pos: 0, inner }
    }

    pub fn into_inner(self) -> &'static [u8] {
        self.inner
    }

    pub const fn position(&self) -> usize {
        self.pos
    }
}
