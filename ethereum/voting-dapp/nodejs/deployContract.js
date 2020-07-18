const fs = require('fs');
const Web3 = require('web3')

// Connecting to the local blockchain
web3 = new Web3("http://localhost:7545")  // Use 8545 if you are using ganache-cli

// TODO
accountAddress = "0x8Cf4B9aE584Da519791355531011ca3F82a0c155" // one of 10 account addresses created in Ganache

bytecode = fs.readFileSync('Voting.bin').toString()
abi = JSON.parse(fs.readFileSync('Voting.abi').toString())

deployedContract = new web3.eth.Contract(abi)

listOfCandidates = ['Puni', 'Anna', 'Bhavin']

// Deploying the contract
deployedContract.deploy({
  data: bytecode,
  arguments: [listOfCandidates.map(name => web3.utils.asciiToHex(name))]
}).send({
  from: accountAddress,
  gas: 1500000,
  gasPrice: web3.utils.toWei('0.00003', 'ether')
}).then((newContractInstance) => {
  deployedContract.options.address = newContractInstance.options.address
  console.log("Contract Address: " + newContractInstance.options.address)
});