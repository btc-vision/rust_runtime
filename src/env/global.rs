pub struct Block {}

pub struct Transaction {}

pub struct Contract {}
pub struct BlockChainEnvironment {
    pub block: Block,
    pub transaction: Transaction,
    pub contract: Contract,
}

pub static mut ENVIRONMENT: Option<BlockChainEnvironment> = None;
