use core::fmt::Debug;

pub enum Error {
    NoMoreData,
    BufferIsFull,
    UnknownSelector,
    DuplicateKey,
    DeadAddress,
    ConvertError,
    ParseError,
    NoValidAddress,

    Revert(&'static str),
    Extra(&'static str),
}

impl Error {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::NoMoreData => "No more data",
            Self::BufferIsFull => "Buffer is full",
            Self::UnknownSelector => "Unknown selector",
            Self::DuplicateKey => "Duplicate key",
            Self::DeadAddress => "Dead address",
            Self::ConvertError => "Convert error",
            Self::ParseError => "ParseError",
            Self::NoValidAddress => "NoValidAddress",

            Self::Revert(err) => err,
            Self::Extra(err) => err,
        }
    }
}

impl Debug for Error {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        f.debug_struct(self.as_str()).finish()
    }
}
