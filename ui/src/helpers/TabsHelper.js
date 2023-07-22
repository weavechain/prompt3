import WalletHelper from "./WalletHelper";

export const getTabs = async ({ id, tab, account = {} }) => {
	const res = await WalletHelper.checkIfUserHasNFT();

	console.log("Has NFTs: " + res)
	let tabs = [
		{
			title: "Ask Assistant",
			url: `/${id}`,
		},
		{
			title: "Submit Prompts",
			url: `/${id}/submit`,
		},
		{
			title: "Check Inclusion",
			url: `/${id}/check`,
		},
	];
	if (res) {
		tabs.push({
			title: "Review Prompts",
			url: `/${id}/review`,
		});
	}

	const r = tabs.map((t) => ({
		...t,
		isActive: t.title === tab,
	}));
	console.log(r)
	return r;
};

const TabsHelper = {
	getTabs,
};

export default TabsHelper;
