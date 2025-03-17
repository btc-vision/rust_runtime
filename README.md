# Rust runtime for OP_NET VM

* Rust contract is able to run under [op-vm](https://github.com/btc-vision/op-vm)
* The interface is defined by [btc-runtime](https://github.com/btc-vision/btc-runtime)
* Library is tested like: [opnet-unit-test](https://github.com/btc-vision/opnet-unit-test)
* Reference contract: [OP_20](https://github.com/btc-vision/OP_20)

## Compilation

```sh
rustup install nightly # ensure that you have last nightly version
cargo build --release -p op20 --target wasm32-unknown-unknown
wasm-opt -O2 -Oz --strip-debug --strip-dwarf --dce --disable-multimemory --disable-fp16 --disable-mutable-globals --disable-gc --disable-multivalue --disable-nontrapping-float-to-int --disable-threads --mvp-features --remove-unused-module-elements ./target/wasm32-unknown-unknown/release/op20.wasm -o op20.wasm
```

## Testing

### With opnet-unit-test on wasm interpreter

```sh
cp ./op20.wasm ../opnet-unit-test/bytecode/MyToken.wasm
npm run test
```

### Without wasm32 runtime

```sh
cargo tests
```

## Structure

* `./src/` - Library providing the interface and helper functions for contract interaction
* `./op20/` - OP20 smart contract, similar to `https://github.com/btc-vision/OP_20`
* `./interface` - test `op-vm` ABI, that everything works fine
