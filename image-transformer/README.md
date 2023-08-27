## Errors

Compiling memchr v2.5.0
error[E0463]: can't find crate for `core`
|
= note: the `aarch64-unknown-linux-gnu` target may not be installed
= help: consider downloading the target with `rustup target add aarch64-unknown-linux-gnu`

```shell
rustup-init
```

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

/Users/sddorosh/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

/Users/sddorosh/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

/Users/sddorosh/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

/Users/sddorosh/.profile
/Users/sddorosh/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


default host triple: aarch64-apple-darwin
default toolchain: stable (default)
profile: default
modify PATH variable: yes

```shell
vim ~/.zshrc
```

# Rust
export RUST_HOME=/Users/sddorosh/.cargo
export PATH=$RUST_HOME/bin:$PATH

```shell
source ~/.zshrc
rustup show
```

Default host: aarch64-apple-darwin
rustup home:  /Users/sddorosh/.rustup

stable-aarch64-apple-darwin (default)
rustc 1.72.0 (5680fa18f 2023-08-23)

```shell
rustc -vV
```

rustc 1.72.0 (5680fa18f 2023-08-23)
binary: rustc
commit-hash: 5680fa18feaa87f3ff04063800aec256c3d4b4be
commit-date: 2023-08-23
host: aarch64-apple-darwin
release: 1.72.0
LLVM version: 16.0.5

```shell
rustup component list --installed
```
cargo-aarch64-apple-darwin
clippy-aarch64-apple-darwin
rust-docs-aarch64-apple-darwin
rust-std-aarch64-apple-darwin
rust-std-x86_64-unknown-linux-gnu
rustc-aarch64-apple-darwin
rustfmt-aarch64-apple-darwin

## Build

```shell
cargo lambda build --release --arm64
```
Binary path:
target/lambda/image-transformer/bootstrap

error[E0507]: cannot move out of index of `Vec<S3EventRecord>`
help: consider borrowing here
let bucket = &payload.records[0].s3.bucket;

let bucket_name = bucket.name.clone().unwrap_or(String::from("hello"));
See:
https://www.sobyte.net/post/2022-03/rust-ownership-three-princples/

## Deploy

```shell
cargo lambda deploy -p sergei --region eu-west-1
```
Or with predefine execution role:
```shell
cargo lambda deploy -p sergei --region eu-west-1 --iam-role arn:aws:iam::329126256916:role/rust-lambda-role
```
cargo lambda build --release --output-format zip