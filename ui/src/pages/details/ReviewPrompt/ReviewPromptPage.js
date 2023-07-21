import React from "react";
import cx from "classnames";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import s from "./ReviewPromptPage.module.scss";
import { formatAmount } from "../../../helpers/Utils";

import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import AppConfig from "../../../AppConfig";
import EarningsTable from "./EarningsTable";
import TabsHelper from "../../../helpers/TabsHelper";

export default function ReviewPromptPage() {
	const { id } = useParams() || {};

	const { submissions = [] } = useSelector((state) => state.submissions || {});
	const tableData = submissions.earningsData;

	const { account = {} } = useSelector((state) => state.user || {});

	const { products = [] } = useSelector((state) => state.products || {});
	const product = products.find((p) => p.id === id) || {};

	return (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget
					tabs={TabsHelper.getTabs({ id, tab: "Review Prompts", account })}
				/>
			</AppHeader>

			<div className={s.content}>
				<div className={s.cards}>
					<div className={cx(s.card, s.accepted)}>
						<div className={s.title}>Accepted</div>
						<div className={s.value}>{submissions.accepted}</div>
					</div>
					<div className={cx(s.card, s.rejected)}>
						<div className={s.title}>Rejected</div>
						<div className={s.value}>{submissions.rejected}</div>
					</div>
					<div className={cx(s.card, s.pending)}>
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
