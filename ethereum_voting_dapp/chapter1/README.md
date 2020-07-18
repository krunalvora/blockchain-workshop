# Setting up in-memory blockchain using Ganache

Install/update npm to the latest version
```bash
sudo npm install -g n
```

As of this documentation, `ganache-cli` [does not work with Node 14](https://github.com/trufflesuite/ganache-cli/issues/732)
```bash
# Install Node 13
sudo n 13.11.0
```

Install ganache-cli and web3
```bash
npm install ganache-cli web3@1.2.6
```

Start the Ganache in-memory blockchain
```bash
node_modules/.bin/ganache-cli
```
This should give you 10 accounts to use.


# Voting Contract

Install solc
```bash
npm install solc@0.6.4
```

Compile the `Voting.sol` file to generate `Voting_sol_Voting.bin` and `Voting_sol_Voting.abi` files
```bash
node_modules/.bin/solcjs --bin --abi Voting.sol
```

> Voting_sol_Voting.bin -> compiled bytecode that is deployed to blockchain 
> Voting_sol_Voting.abi -> tells the user what methods are available in the contract


# Deploy application using web3

```bash

$ node

> Web3 = require('web3')
> web3 = new Web3("http://localhost:8545")
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

```bash
> deployedContract.methods.totalVotesFor(web3.utils.asciiToHex('Puni')).call(console.log)
> deployedContract.methods.voteForCandidate(web3.utils.asciiToHex('Puni')).send({from: 'YOUR ACCOUNT ADDRESS'}).then((f) => console.log(f))
> deployedContract.methods.totalVotesFor(web3.utils.asciiToHex('Puni')).call(console.log)
```


# Interact using a web page

- Update index.js with contract's address
- Open `index.html` on your browser


# Reference
[Medium arcticle](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) by Mahesh Murthy.
