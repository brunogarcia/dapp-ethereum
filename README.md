# DApp Ethereum

### [Build Solidity DApp](https://buildspace.so/p/build-solidity-web3-app)

Learn some Solidity, write + deploy a smart contract to the blockchain, and build a Web3 client app to interact with your contract. Perfect for hackers curious about crypto.

## Contracts

> 🔔 Rename the file `.env.example` to `.env.local`. And then add the contract address.

The contracts are stored on [https://github.com/brunogarcia/smart-contracts-ethereum](https://github.com/brunogarcia/smart-contracts-ethereum)

After updated our contract we need to do a few things:

1. Redeploy the smart contract.
2. Update contract address on the `.env.local` file.
3. Update ABI file on the web app.

Why do we need to do all this?

Well, it's because smart contracts are immutable. They can't change. They're permanent. That means changing a contract requires a full redeploy. This will also reset all the variables since it'd be treated as a brand new contract. That means we'd lose all our wave data if we wanted to update the contract's code.

## Development

```
yarn dev
```