import { randomBoolFlag } from "../helpers/Utils";
import UserRoles from "../data/models/UserRoles";
import products from "./products";
import submissions from "./submissions";
import prompts from "./prompts";
import submissions_accepted from "./submissions_accepted";

const DEFAULT_DEMO_DATA = {
	products,
	submissions,
	submissions_accepted,
	prompts,
	account: {
		role: randomBoolFlag() ? UserRoles.publisher : UserRoles.author,
		balance: 0,
		lockedAmount: 104.32,
		withdrawableAmount: 0,
		walletAmount: 500,
		publicKey: "weavee4d9abgaypPw6789h3oKMh8TzXm62sNaADDryq6JY36o",
	},
};

export default DEFAULT_DEMO_DATA;
