import { uniqueId } from "lodash";

import AppConfig from "../AppConfig";
import Image1 from "../assets/images/products/paris.png";

const tokens = [
	`Polygon:${AppConfig.CURRENCY}`,
	`solana:${AppConfig.CURRENCY}`,
	`gnosis:${AppConfig.CURRENCY}`,
	`ethereum:${AppConfig.CURRENCY}`,
	`btc:${AppConfig.CURRENCY}`,
];

const PRODUCTS = [
	{
		id: uniqueId("1"),
		table_id: 1,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Solidity Engineer",
		description: "Solidity Engineer Description",
		persona: "solidity_engineer",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:solidity_engineer",
		price: 0.5,
		token: "USDC"
	},
	{
		id: uniqueId("2"),
		table_id: 2,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Paris Guide",
		description: "Paris Guide Description",
		persona: "paris_guide",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:paris_guide",
		price: 0.5,
		token: "USDC"
	},
	{
		id: uniqueId("3"),
		table_id: 3,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Pregnancy Nurse",
		description: "Pregnancy Nurse Description",
		persona: "pregnancy_nurse",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:pregnancy_nurse",
		price: 0.5,
		token: "USDC"
	},
	{
		id: uniqueId("4"),
		table_id: 4,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Startup Advisor",
		description: "Startup Advisor Description",
		persona: "startup_advisor",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:startup_advisor",
		price: 0.5,
		token: "USDC"
	},
	{
		id: uniqueId("5"),
		table_id: 5,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Crypto Trader",
		description: "Crypto Trader Description",
		persona: "crypto_trader",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:crypto_trader",
		price: 0.5,
		token: "USDC"
	},
	{
		id: uniqueId("4"),
		table_id: 4,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Ethical Data Consultant",
		description: "Ethical Data Consultant",
		persona: "ethical_data_consultant",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:ethical_data_consultant",
		price: 0.5,
		token: "USDC"
	},
];

export default PRODUCTS;
