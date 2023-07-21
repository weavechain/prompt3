import UserRoles from "../data/models/UserRoles";

export const getTabs = ({ id, tab, account = {} }) => {
	let tabs =
		account.role === UserRoles.publisher
			? [
					{
						title: "Ask Persona",
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
			  ]
			: [
					{
						title: "Ask Persona",
						url: `/${id}`,
						isActive: true,
					},
					{
						title: "Submit Prompts",
						url: `/${id}/submit`,
					},
					{
						title: "Check Inclusion",
						url: `/${id}/check`,
					},
					{
						title: "Review Prompts",
						url: `/${id}/review`,
					},
			  ];

	return tabs.map((t) => ({
		...t,
		isActive: t.title === tab,
	}));
};

const TabsHelper = {
	getTabs,
};

export default TabsHelper;
