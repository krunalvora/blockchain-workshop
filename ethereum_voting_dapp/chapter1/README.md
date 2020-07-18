# Table of Contents
1. [Set up Ganache in-memory blockchain](#set-up-Ganache-in-memory-blockchain)
    1. [Using Ganache desktop application](#using-ganache-desktop-application)
    2. [Using docker](#using-docker)
    2. [Using npm ganache-cli](#Using-npm-ganache-cli)
2. [Install Solidity compiler](#install-solidity-compiler)
2. [NodeJS Dapp](#nodejs-dapp)
    1. [Compile voting contract](#Compile-voting-contract)
    2. [Deploy application using web3.js - Ethereum JavaScript API](#Deploy-application-using-web3.js-Ethereum-JavaScript-API)
    3. [Interact with the contract through NodeJS console](#Interact-with-the-contract-through-NodeJS-console)
    4. [Interact using a web page](#Interact-using-a-web-page)

# Set up Ganache in-memory blockchain

## Using Ganache desktop application

https://www.trufflesuite.com/ganache

![](https://www.trufflesuite.com/img/ganache-window.png)

## Using Docker
```bash
docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest
```

## Using npm ganache-cli
```bash
# Install/update npm to latest version
sudo npm install -g n

# As of this documentation, `ganache-cli` does not work with Node 14 (https://github.com/trufflesuite/ganache-cli/issues/732)
# Install Node 13
sudo n 13.11.0

# Install ganache-cli and web3
npm install ganache-cli

# Start Ganache in-memory blockchain
node_modules/.bin/ganache-cli
```

# Install Solidity compiler

https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html#binary-packages

# NodeJS Dapp

## Compile voting contract

Install solc
```bash
npm install solc@0.6.4
```

Compile `Voting.sol` file to generate `Voting_sol_Voting.bin` and `Voting_sol_Voting.abi` files
```bash
node_modules/.bin/solcjs --bin --abi Voting.sol
```

> Voting_sol_Voting.bin -> compiled bytecode that is deployed to blockchain

> Voting_sol_Voting.abi -> tells user what methods are available in the contract


## Deploy application using web3.js - Ethereum JavaScript API

```bash
npm install web3@1.2.6
```
```javascript

$ node

> Web3 = require('web3')
> web3 = new Web3("http://localhost:7545")  // Use 8545 if you are using ganache-cli
> web3.eth.getAccounts(console.log)
# Should list all 10 accounts

> bytecode = fs.readFileSync('Voting_sol_Voting.bin').toString()
> abi = JSON.parse(fs.readFileSync('Voting_sol_Voting.abi').toString())

> deployedContract = new web3.eth.Contract(abi)
> listOfCandidates = ['Puni', 'Anna', 'Bhavin']
> deployedContract.deploy({
  data: bytecode,
  arguments: [listOfCandidates.map(name => web3.utils.asciiToHex(name))]
}).send({
  from: '<ENTER 1 OF 10 ACCOUNT ADDRESSES like 0xfb3....>',
  gas: 1500000,
  gasPrice: web3.utils.toWei('0.00003', 'ether')
}).then((newContractInstance) => {
  deployedContract.options.address = newContractInstance.options.address
  console.log(newContractInstance.options.address)
});


```

# Interact with the contract through NodeJS console

```javascript
> deployedContract.methods.totalVotesFor(web3.utils.asciiToHex('Puni')).call(console.log)
> deployedContract.methods.voteForCandidate(web3.utils.asciiToHex('Puni')).send({from: 'YOUR ACCOUNT ADDRESS'}).then((f) => console.log(f))
> deployedContract.methods.totalVotesFor(web3.utils.asciiToHex('Puni')).call(console.log)
```


# Interact using a web page

- Update index.js with contract's address (returned by the deploy application code / available in the contract create block on Ganache desktop application)
- Open `index.html` on your browser
