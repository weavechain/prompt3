import abi from '../POAP_abi.json'

import AppConfig from "../AppConfig";
import Web3 from "web3";
import LOCAL_STORAGE from "../helpers/localStorage";

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

const checkWeb3 = async() => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();

		let stateData = LOCAL_STORAGE.loadState() || {};

		if (1 * window.ethereum.networkVersion !== GNOSIS_CHAIN_ID && !stateData.chainChanged) {
			try {
				LOCAL_STORAGE.saveState({
					...stateData,
					chainChanged: true
				});

				await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: GNOSIS_CHAIN_ID }],
				});
			} catch (switchError) {
				try {
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [ GNOSIS_MAINCHAIN ],
					});
				} catch (error) {
					console.debug(error);
				}
			}
		}
	}
};

const checkIfUserHasNFT = async () => {
	try {
		checkWeb3();

		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];
		if (!account) {
			return false
		}

		const items = AppConfig.NFT_TOKEN_URI.split(":");
		const addr = items[0] === "POAP" ? items[1] : AppConfig.NFT_TOKEN_URI;

		const contract = await new window.web3.eth.Contract(abi, addr);
		let count = await contract.methods.balanceOf(account).call();
		console.log("Wallet " + account + " has " + count + " NFTs");

		if (items[0] === "POAP" && count > 0) {
			for (let i = 0; i < count; i++) {
				const details = await contract.methods.tokenDetailsOfOwnerByIndex(account, i).call();
				const tokenId = details[0];

				if (tokenId == parseInt(items[2])) {
					return true;
				}
			}
			return false;
		} else {
			return count > 0;
		}
	} catch (e) {
		console.log(e)
		console.log("Error during checkIfUserHasNFT:" + JSON.stringify(e))
		return false
	}
};

const mint = async (wallet) => {
	if (wallet) {
		try {
			checkWeb3();

			const contract = await new window.web3.eth.Contract(abi, AppConfig.NFT_TOKEN_URI);
			let mint = await contract.methods.mintNFT(wallet).send({
				from: wallet,
				to: AppConfig.NFT_TOKEN_URI,
				gasPrice: AppConfig.DEFAULT_GAS_PRICE,
				gasLimit: AppConfig.GAS_LIMIT
			});
			console.log(mint);
			const receipt = await new window.web3.eth.getTransactionReceipt(mint.transactionHash);
			console.log(receipt);

			return receipt;
		} catch (e) {
			console.log("Failed minting");
			console.log(e);
			return false;
		}
	} else {
		return false;
	}
};

const WalletHelper = {
	checkIfUserHasNFT,
	mint,
};

export default WalletHelper;
