import UserRoles from "../data/models/UserRoles";

export const getTabs = ({ id, tab, account = {} }) => {
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

	if (account.role === UserRoles.publisher) {
		tabs.push({
			title: "Review Prompts",
			url: `/${id}/review`,
		});
	}

	return tabs.map((t) => ({
		...t,
		isActive: t.title === tab,
	}));
};

const TabsHelper = {
	getTabs,
};

export default TabsHelper;
