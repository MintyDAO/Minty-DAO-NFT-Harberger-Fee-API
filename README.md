

## Create .env
```
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=NFT
PORT=9005
NODE_PROVIDER = ""
NODES = ""
NODE_WSS_ETH = 'wss://bsc-ws-node.nariox.org:443'
TOTAL_NFT_INDEXES=1000
AUTH_TOKEN=
```


## Create DB if not exist

```
CREATE DATABASE NFT;

CREATE TABLE nfts(tokenIndex int(4), tokenIndexUsed tinyint(1), tokenReservedTime int(12), owner VARCHAR(128), isOffered tinyint(1), offerPrice VARCHAR(128), PRIMARY KEY(tokenIndex));
```

## Fill indexes in DB

```
execude: node restore/restoreIndexes
```

## Restore all transaction history in DB
```
execude: node restore/restoreTxs or add this function call in app.js,
for automaticly restore data after reload api
```


## Run API
```
pm2 start app.js --name "mainnet API"
```


## Possible Errors

```
Check correct config in API (ropsten vs mainnet). Comment/Uncomment SmartFundRegistryADRESS for Your network
```

## If CoTrader geth node will broke
```
1) Go to web3/web3Provider
2) Unkomment const provider = getRandomProvider()
3) Comment const provider = process.env.COTRADER_NODE
4) Redeploy api
```

## How this works

```
1 Script BlockListener - listen new block, when new block was created, script run script updater, with parameter new block.
2 Script updater - read ALL data from contract if API deploy/reload then listen events from latest block received from script BlockListener
3 Script updaterController, make update if event was missed
4 Script restoreTxs - checks all events for all participants of the fund, starting with the block 0
```


## Infura issue
```
If there are will be some issue with Infura, You can rise own node, or some service like quick node and then rise this api
https://bitbucket.org/cotrader/cotrader-api-single-provider/src/master/

Or just set new provider in env.NODES = ""
```
