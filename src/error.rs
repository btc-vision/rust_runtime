#[derive(Debug)]
pub enum Error {
    NoMoreData,
    BufferIsFull,
    UnknownSelector,
    DuplicateLey,
    DeadAddress,
    InsufficientTotalSupply,
    NoBalance,
    InsufficientBalance,
    MaxSupplyReached,
    CanNotTransferFromSelfAccount,
    CannotTransferZeroTokens,
    OnlyOwner,
    NoTokens,
    InsufficientAllowance,
}
