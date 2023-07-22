import React from "react";
import cx from "classnames";
import s from "./SubmissionsPage.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { initSubmissions } from "../../../_redux/actions/submissions";
import { formatAmount } from "../../../helpers/Utils";

import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import AppConfig from "../../../AppConfig";
import EarningsTable from "./EarningsTable";
import LOCAL_STORAGE from "../../../helpers/localStorage";

export default function SubmissionsPage() {
	const dispatch = useDispatch();
	const { submissions = [] } = useSelector((state) => state.submissions || {});
	const tableData = submissions.earningsData;

	const tabs = [
		{
			title: "Overview",
			url: "/account/overview",
		},
		{
			title: "Submissions",
			url: "/account/submissions",
			isActive: true,
		},
		{
			title: "Transfer funds",
			url: "/account/transfer-funds",
		},
	];

	// ------------------------------------- METHODS -------------------------------------

	const toggleData = () => {
		let oldState = LOCAL_STORAGE.loadState() || {};
		LOCAL_STORAGE.saveState({
			...(oldState || {}),
			showAccepted: !oldState.showAccepted,
		});

		dispatch(initSubmissions());
	};

	return (
		<div className={s.root}>
			<AppHeader title="Account" onAvatarClick={toggleData}>
				<TabsWidget tabs={tabs} />
			</AppHeader>

			<div className={s.content}>
				<div className={s.cards}>
					<div className={cx(s.card, s.accepted)}>
						<div className={s.title}>Active</div>
						<div className={s.value}>{submissions.active}</div>
					</div>
					<div className={cx(s.card, s.rejected)}>
						<div className={s.title}>Pending</div>
						<div className={s.value}>{submissions.pending}</div>
					</div>
					<div className={cx(s.card, s.submitted)}>
						<div className={s.title}>Submitted</div>
						<div className={s.value}>{submissions.submitted}</div>
					</div>

					<div className={cx(s.card, s.earnings)}>
						<div className={s.earned}>
							{formatAmount(submissions.totalEarnings, 2, false, 2)}{" "}
							<span>{AppConfig.CURRENCY} Earned Total</span>
						</div>
					</div>
				</div>

				<EarningsTable data={tableData} />
			</div>
		</div>
	);
}
