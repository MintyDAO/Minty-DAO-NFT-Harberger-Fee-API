exports.NFT_FACTORY_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_maxSupply",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_platformToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_initialPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_config",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_veHolders",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_baseURI",
				"type": "string"
			}
		],
		"name": "create",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			}
		],
		"name": "NewNFT",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "latestNFTPerSender",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nfts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
