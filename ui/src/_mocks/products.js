import { uniqueId } from "lodash";

import Image1 from "../assets/images/products/solidity_engineer.svg";
import Image2 from "../assets/images/products/paris_guide.svg";
import Image3 from "../assets/images/products/pregnancy_nurse.svg";
import Image4 from "../assets/images/products/startup_advisor.svg";
import Image5 from "../assets/images/products/crypto_trader.svg";
import Image6 from "../assets/images/products/ethical_data_consultant.svg";

const license_description = `<ol>
<li> Please submit prompts related to Paris, including but not limited to: tourist attractions, local events, cultural experiences, historical sites, recommended restaurants, and travel tips. For example, "What is the best time to visit the Louvre?" or "Recommend some authentic French restaurants in the Marais district".</li>
<li>Prompts that are not related to Paris or travel in Paris. For example, questions about other cities, personal advice, or inappropriate content will not be accepted.</li>
<li>Please submit your prompts in a clear and concise manner. Make sure your prompt is in the form of a question or a request for information. For example, "Tell me about the history of Notre-Dame Cathedral" or "What are some lesser-known neighborhoods to explore in Paris?"</li>
<li>Please ensure your prompts are grammatically correct and free of profanity or offensive language.</li>
<li>You can submit multiple prompts, but please refrain from submitting the same prompt repeatedly.</li>
<li>Prompts will be reviewed and accepted or rejected at the sole discretion of the</li>
</ol>`;

const hashes = {
	merkle_root_hash: "B4JkWiUwoSHkpxehXzeXfUa8UDL2dMpFpMgyca72Tak9",
	input_prompt_hash: "6LfKoQQMqb8fYgA1PwBPKMhFaJ59Fn3DWw6qTRri4zjN",
	super_prompt_creation_hash: "4M5CUV9uRi6EE42YEKxYyPkd35Kf1CMfUWig1VUMfnWu=",
	super_prompt_hash: "36UaD8YjacqVUxbbCoAssrkruugmmAWjC7sQLvKEJcNC",
	signature_hash:
		"KW3AkT5yH3Rx6Y86xKmXXwq5XSNAaaqcXewxseQ4mVCam5WGpiepuT2HHMwydyUKyygswfhy6J5Vv6q8sfCAWch",
};

const PRODUCTS = [
	{
		id: uniqueId("1"),
		table_id: 1,
		dataset_logo: Image1,
		product_logo: Image1,
		title: "Solidity Engineer",
		description:
			"Expert guidance, problem-solving solutions, and code suggestions for developers working on Ethereum-based blockchain applications using the Solidity programming language.",
		persona: "solidity_engineer",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:solidity_engineer",
		price: 0.5,
		token: "USDC",
		blockchain: "Gnosis",
		license_description,
		...hashes,
	},
	{
		id: uniqueId("2"),
		table_id: 2,
		dataset_logo: Image2,
		product_logo: Image2,
		title: "Paris Guide",
		description:
			"Guidance on navigating Paris, offering advice on landmarks, public transport, local cuisine, and cultural customs to enhance your tourist experience.",
		persona: "paris_guide",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:paris_guide",
		price: 0.5,
		token: "USDC",
		...hashes,
	},
	{
		id: uniqueId("3"),
		table_id: 3,
		dataset_logo: Image3,
		product_logo: Image3,
		title: "Pregnancy Nurse",
		description:
			"Expert advice, information, and guidance on various pregnancy and nursing-related questions, ensuring expectant and new mothers receive comprehensive, reliable, and personalized support.",
		persona: "pregnancy_nurse",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:pregnancy_nurse",
		price: 0.5,
		blockchain: "Gnosis",
		token: "USDC",
		...hashes,
	},
	{
		id: uniqueId("4"),
		table_id: 4,
		dataset_logo: Image4,
		product_logo: Image4,
		title: "Startup Advisor",
		description:
			"Strategic guidance, industry insights, and practical solutions to budding entrepreneurs and early-stage companies.",
		persona: "startup_advisor",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:startup_advisor",
		price: 0.5,
		blockchain: "Gnosis",
		token: "USDC",
		...hashes,
	},
	{
		id: uniqueId("5"),
		table_id: 5,
		dataset_logo: Image5,
		product_logo: Image5,
		title: "Crypto Trader",
		description:
			"Real-time cryptocurrency market insights, assist in trading strategies, and answer complex crypto-related queries to facilitate informed investment decisions.",
		persona: "crypto_trader",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:crypto_trader",
		price: 0.5,
		blockchain: "Gnosis",
		token: "USDC",
		...hashes,
	},
	{
		id: uniqueId("4"),
		table_id: 4,
		dataset_logo: Image6,
		product_logo: Image6,
		title: "Ethical Data Consultant",
		description:
			"Guidance on data privacy, consent, fairness, accountability, and other ethical considerations related to data collection, storage, and usage.",
		persona: "ethical_data_consultant",
		did: "did:weave:28QafJHUDymigJntadfRwHsZBEPGfBFxJxCSzmoMyLVRS:ethical_data_consultant",
		price: 0.5,
		blockchain: "Gnosis",
		token: "USDC",
		...hashes,
	},
];

export default PRODUCTS;
