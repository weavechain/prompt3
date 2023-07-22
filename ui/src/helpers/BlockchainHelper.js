const GNOSIS_CHAIN_ID = "0x64";
const GNOSIS_TESTNET_ID = "0x27D8";

const GNOSIS_MAINCHAIN = {
	chainId: GNOSIS_CHAIN_ID,
	chainName: "Gnosis",
	nativeCurrency: {
		name: "xDai",
		symbol: "xDai",
		decimals: 18,
	},
	rpcUrls: ["https://rpc.gnosischain.com"],
	blockExplorerUrls: ["https://gnosisscan.io/"],
};

const GNOSIS_TESTNET = {
	chainId: GNOSIS_TESTNET_ID,
	chainName: "Chiado Testnet",
	nativeCurrency: {
		name: "Chiado xDai",
		symbol: "xDai",
		decimals: 18,
	},
	rpcUrls: ["https://rpc.chiadochain.net"],
	blockExplorerUrls: ["https://blockscout.com/gnosis/chiado/"],
};

const TOKENS = {
	"gnosis:USDC": "0x087C5c24dCC412aEb0194503B51f74139b90596C"
};

// ------------------------------------- METHODS -------------------------------------
const getTokenAddress = ({ token }) => {
	return TOKENS[token];
};

const getChain = (useTestnet) => {
	return useTestnet ? GNOSIS_TESTNET : GNOSIS_MAINCHAIN;
};

const getChainId = (useTestnet) => {
	return parseInt(useTestnet ? GNOSIS_TESTNET_ID : GNOSIS_CHAIN_ID, 16);
};

const BlockchainHelper = {
	getChainId,
	getChain,
	getTokenAddress,
};

export default BlockchainHelper;
