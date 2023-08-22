import WeaveHelper from "./weavehelper";
import WeaveAPI from "../weaveapi/weaveapi";
import LOCAL_STORAGE from "../helpers/localStorage";

import { binary_to_base58 } from "base58-js";
import Web3 from "web3";

import defaultConfig from "./--app-color.json";

const feeTokenAbi = require("../weave/ERC20.json");

export const toHex = (str) => {
	var result = "";
	for (let i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
};

export const getMetamaskWallet = async () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();

		let accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		if (!accounts || accounts.length === 0) {
			/* const permissions = await window.ethereum.request({
				method: "wallet_requestPermissions",
				params: [
					{
						eth_accounts: {},
					},
				],
			}); */
			accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
		}
		return Web3.utils.toChecksumAddress(accounts[0]);
	} else {
		return null;
	}
};

const getMessageToSign = (wallet, pub, signWalletOnly = false) => {
	return signWalletOnly
		? wallet
		: "Please sign this message to confirm you own this wallet\nThere will be no blockchain transaction or any gas fees." +
				"\n\nWallet: " +
				wallet +
				"\nKey: " +
				pub;
};

const createApi = async (
	chain,
	bootstrapNode,
	config = defaultConfig,
	needsWallet = false,
	forceResign = false
) => {
	let stateData = LOCAL_STORAGE.loadState() || {};
	const keys = WeaveHelper.Helper.generateKeys();
	const pub = stateData.pub || keys[0];
	const pvk = stateData.pvk || keys[1];

	//const cacheSignatures = config.cacheSignatures == null ? true : !!config.cacheSignatures;

	let { signatures } = stateData;

	if (needsWallet && window.ethereum && !window.web3) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	}

	let wallet = needsWallet ? await getMetamaskWallet() : "";

	const node = bootstrapNode || config.sideChain;
	const cfg = WeaveHelper.Helper.getConfig(node, pub, pvk);
	//console.log(config);
	const nodeApi = new WeaveAPI().create(cfg);
	await nodeApi.init();
	//console.log(await nodeApi.ping());

	const signWalletOnly = false;
	let key = null;
	let sig = null;
	if (chain === "solana") {
		key = "solana:" + wallet + ":" + (signWalletOnly ? "wallet" : pub);
		if (forceResign || !signatures || !signatures[key]) {
			if (!signatures) signatures = {};

			const response = await window.solana.connect();
			wallet = response.publicKey.toString().toLowerCase();
			let msg = getMessageToSign(wallet, pub, signWalletOnly);

			const signature = await window.solana.signMessage(
				new TextEncoder().encode(msg),
				"utf8"
			);
			sig = binary_to_base58(signature.signature);
			signatures[key] = sig;
		} else {
			sig = signatures[key];
		}
	} else if (chain) {
		key = "eth:" + wallet + ":" + (signWalletOnly ? "wallet" : pub);
		if (forceResign || !signatures || !signatures[key]) {
			if (!signatures) signatures = {};
			wallet = await getMetamaskWallet();

			let msg = getMessageToSign(wallet, pub, signWalletOnly);

			sig = await window.ethereum.request({
				method: "personal_sign",
				params: [wallet, signWalletOnly ? toHex(msg) : msg],
			});
			signatures[key] = sig;
		} else {
			sig = signatures[key];
		}
	}

	const credentials = sig
		? {
				account: chain + ":" + wallet,
				sig: sig,
				template: "*",
				role: "*",
		  }
		: null;

	LOCAL_STORAGE.saveState({
		...stateData,
		signatures: signatures,
		pub,
		pvk,
	});

	return { pub, nodeApi, credentials, wallet };
};

const checkWeb3 = () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	}
};

// ------------------------------------- PUBLIC -------------------------------------
export const getFiatToken = async (feeTokenAddress) => {
	const feeToken = await new window.web3.eth.Contract(
		feeTokenAbi,
		feeTokenAddress
	);

	const decimals = await feeToken.methods.decimals().call();
	return { feeToken, decimals };
};

export const signWallet = async (product, config = defaultConfig) => {
	checkWeb3();

	const chain = product.token.substr(0, product.token.indexOf(":"));
	const { nodeApi } = await createApi(
		chain,
		product.weave?.bootstrap_node,
		config,
		true,
		true
	);
	return nodeApi;
};

const MarketApiHelper = {
	toHex,
	signWallet,
};

export default MarketApiHelper;
