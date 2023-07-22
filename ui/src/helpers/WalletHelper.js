import abi from '../LineageNFT_abi.json'

import AppConfig from "../AppConfig";
import Web3 from "web3";

const checkWeb3 = async() => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	}
};

const checkIfUserHasNFT = async () => {
	checkWeb3();

	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
	if (!account) {
		return false
	}

	const contract = await new window.web3.eth.Contract(abi, AppConfig.NFT_TOKEN_URI);
	let count = await contract.methods.balanceOf(account).call();
	console.log("Wallet " + account + " has " + count + " NFTs");
	return count > 0;
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
