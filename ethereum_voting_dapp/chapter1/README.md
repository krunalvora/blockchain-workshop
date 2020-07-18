# Using web3.js - Ethereum JavaScript API

# Compile voting contract

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


# Deploy application using web3

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

- Update index.js with contract's address
- Open `index.html` on your browser
