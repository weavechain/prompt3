import React from "react";

import s from "./TransferFundsPage.module.scss";
import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";

export default function TransferFundsPage() {
	const tabs = [
		{
			title: "Overview",
			url: "/account/overview",
		},
		{
			title: "Submissions",
			url: "/account/submissions",
		},
		{
			title: "Transfer funds",
			url: "/account/transfer-funds",
			isActive: true,
		},
	];

	return (
		<div className={s.root}>
			<AppHeader title="Account">
				<TabsWidget tabs={tabs} />
			</AppHeader>

			<div className={s.content}></div>
		</div>
	);
}
