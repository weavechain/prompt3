import AppConfig from "../AppConfig";
import TRANSFER_FUNDS_TYPES from "./models/TransferFundsTypes";

const getBalanceTypes = (account = {}) => {
	const { balance, withdrawableAmount, walletAmount } = account;
	const wallets = {
		locked: {
			id: 1,
			name: `Locked (Sidechain)`,
			transferTypes: [TRANSFER_FUNDS_TYPES.lockedToWithdrawable],
			current: balance ? (1 * balance).toFixed(2) : balance,
			new: (1 * balance).toFixed(2),
			accountField: "lockedAmount",
			tooltipText:
				"Funds can be used to perform data operations or be transferred to your Withdrawable wallet",
			icons: [
				{ direction: "down", type: TRANSFER_FUNDS_TYPES.lockedToWithdrawable },
			],
		},
		withdrawable: {
			id: 2,
			name: "Withdrawable (L1)",
			transferTypes: [TRANSFER_FUNDS_TYPES.withdrawableToWallet],
			current: withdrawableAmount
				? (1 * withdrawableAmount).toFixed(2)
				: withdrawableAmount,
			new: (1 * withdrawableAmount).toFixed(2),
			accountField: "withdrawableAmount",
			tooltipText: `Funds can be transferred to the ${AppConfig.AppName} or an external wallet`,
			icons: [
				{
					direction: "down",
					type: walletAmount ? TRANSFER_FUNDS_TYPES.withdrawableToWallet : null,
				},
				/* {
					direction: "up",
					type: TRANSFER_FUNDS_TYPES.withdrawableToLocked,
				}, */
			],
		},
	};

	return wallets;
};

const AccountHelper = {
	getBalanceTypes,
};

export default AccountHelper;
