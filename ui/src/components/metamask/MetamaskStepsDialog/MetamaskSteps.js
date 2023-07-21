const MetamaskSteps = {
	network: 0,
	payment: 1,
	processing: 2,
};

export const getMetamaskPurchaseSteps = (METAMASK_STEPS_ICONS, { network }) => {
	return [
		{
			id: 1,
			name: "Network",
			image: METAMASK_STEPS_ICONS.NetworkIcon,
			description:
				"You need to switch to " +
				network?.chainName +
				" using Metamask to purchase this NFT.",
		},

		{
			id: 2,
			name: "Payment",
			image: METAMASK_STEPS_ICONS.PaymentIcon,
			description: `Pay the requested amount complete the transaction.`,
		},
		{
			id: 3,
			name: "Processing",
			image: METAMASK_STEPS_ICONS.GeneratingIcon,
			description: "Processing transaction, please wait...",
		},
	];
};

export default MetamaskSteps;
