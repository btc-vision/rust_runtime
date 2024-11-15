#[derive(Debug)]
pub enum Error {
    NoMoreData,
    BufferIsFull,
    UnknownSelector,
}
