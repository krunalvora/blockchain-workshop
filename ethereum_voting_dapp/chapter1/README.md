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
