const POLYGON_CHAIN_ID = "0x89";
const POLYGON_TESTNET_ID = "0x13881";

const POLYGON_MAINCHAIN = {
	chainId: POLYGON_CHAIN_ID,
	chainName: "Polygon Mainnet",
	nativeCurrency: {
		name: "MATIC",
		symbol: "MATIC",
		decimals: 18,
	},
	rpcUrls: ["https://polygon-rpc.com"],
	blockExplorerUrls: ["https://polygonscan.com/"],
};

const POLYGON_TESTNET = {
	chainId: POLYGON_TESTNET_ID,
	chainName: "Mumbai Testnet",
	nativeCurrency: {
		name: "MATIC",
		symbol: "MATIC",
		decimals: 18,
	},
	rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
	blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

const TOKENS = {
	//"polygon-testnet:USDC": "0xE097d6B3100777DC31B34dC2c58fB524C2e76921",
	"polygon-testnet:USDC": "0xb3fd6caa31d92dca1b287899b13005a79c0dee60",
	"avalanche:USDT": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
};

// ------------------------------------- METHODS -------------------------------------
const getTokenAddress = ({ token }) => {
	return TOKENS[token];
};

const getChain = (useTestnet) => {
	return useTestnet ? POLYGON_TESTNET : POLYGON_MAINCHAIN;
};

const getChainId = (useTestnet) => {
	return parseInt(useTestnet ? POLYGON_TESTNET_ID : POLYGON_CHAIN_ID, 16);
};

const BlockchainHelper = {
	getChainId,
	getChain,
	getTokenAddress,
};

export default BlockchainHelper;
