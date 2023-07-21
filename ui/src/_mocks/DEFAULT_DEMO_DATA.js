import products from "./products";
import submissions from "./submissions";
import submissions_accepted from "./submissions_accepted";

const DEFAULT_DEMO_DATA = {
	products,
	submissions,
	submissions_accepted,
	account: {
		balance: 0,
		lockedAmount: 104.32,
		withdrawableAmount: 0,
		walletAmount: 500,
		privateKey: "private_4d9abgaypPw6789h3oKMh8TzXm62sNaADDryq6JY36o",
		publicKey: "weavee4d9abgaypPw6789h3oKMh8TzXm62sNaADDryq6JY36o",
	},
};

export default DEFAULT_DEMO_DATA;
