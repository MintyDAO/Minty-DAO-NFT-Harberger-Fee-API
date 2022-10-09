## Create .env
```
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=MintyDAONFT
PORT=9005
NODE_PROVIDER = ""
NODES = ""
NODE_WSS_ETH = 'wss://bsc-ws-node.nariox.org:443'
TOTAL_NFT_INDEXES=1000
AUTH_TOKEN=
```

## Create DB if not exist
```
CREATE DATABASE MintyDAONFT;

CREATE TABLE nfts(nftAddress VARCHAR(128), PRIMARY KEY(nftAddress));
```

## Run API
```
pm2 start app.js --name "MINTY-DAO-NFT"
```
