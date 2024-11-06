pub struct OP20Params {
    pub max_supply: ethnum::U256,
    pub decimals: u8,
    pub name: &'static str,
    pub symbol: &'static str,
}

pub trait OP20Trait {}
