# Rust runtime for OP_NET VM
* Rust contract is able to run under [op-vm](https://github.com/btc-vision/op-vm)
* The interface is defined by [btc-runtime](https://github.com/btc-vision/btc-runtime)
* Library is tested like: [opnet-unit-test](https://github.com/btc-vision/opnet-unit-test)

## Compilation
```sh
cargo build --release -p example
wasm-opt -O2 -Oz ../target/wasm32-unknown-unknown/release/example.wasm -o ./rust.wasm
```

## Testing
```sh
cp ./rust.wasm ../opnet-unit-test/bytecode/rust.wasm
node build/tests/rust.js 
```

## Size
* Compiled code from [moto library](https://github.com/btc-vision/moto): 23KB (23464B)
* Unoptimized code from current Rust library: 31KB (31359B) - incomplete
* Optimized code with wasm-opt: 22KB (21778B) - incomplete

## Structure
* `./src/` - Library providing the interface and helper functions for contract interaction
* `./example/` - Sample smart contract, similar to contract used in unit tests

## TODO
### Buffer operations and manipulations 
* Investigate if it’s possible to directly map structs to memory
* Write memory manipulation methods (`readAddress`, `readUint32`, etc.)
* Create unit tests and check for memory leaks

## Contract helpers
* Coding methods like `byte4`, `encodeSelector`, `hash`, etc.
* Decoding passed buffers (`set_environment`, `execute`, `on_deploy`) into correct structures

## Smart contract and unit tests
* Copy basic functionality from OP20 contract to examples, as needed
