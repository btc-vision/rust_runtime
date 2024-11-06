impl super::Cursor {
    pub fn read_u32(&mut self) -> u32 {
        let result = u32::from_le_bytes(self.inner[self.pos..self.pos + 4].try_into().unwrap());
        self.pos += 4;
        result
    }
}
