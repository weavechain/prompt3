import UserRoles from "../data/models/UserRoles";
import WalletHelper from "./WalletHelper";

export const getTabs = async ({ id, tab, account = {} }) => {
	return WalletHelper.checkIfUserHasNFT().then(res => {
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
	
		return tabs.map((t) => ({
			...t,
			isActive: t.title === tab,
		}));
	});
};

const TabsHelper = {
	getTabs,
};

export default TabsHelper;
