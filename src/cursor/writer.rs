impl super::Cursor {
    pub fn write_u8(&mut self, val: u8) {
        self.inner[self.pos..self.pos + 1].copy_from_slice(&val.to_le_bytes());
        self.pos += 1;
    }

    pub fn write_u16(&mut self, val: u16) {
        self.inner[self.pos..self.pos + 2].copy_from_slice(&val.to_le_bytes());
        self.pos += 2;
    }

    pub fn write_u32(&mut self, val: u32) {
        self.inner[self.pos..self.pos + 4].copy_from_slice(&val.to_le_bytes());
        self.pos += 4;
    }

    pub fn write_u64(&mut self, val: u64) {
        self.inner[self.pos..self.pos + 8].copy_from_slice(&val.to_le_bytes());
        self.pos += 8;
    }
}
