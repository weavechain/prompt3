import React, { useState, useEffect } from "react";
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
import SubmitionStatus from "../../../helpers/models/SubmitionStatus";

import { readPrompts, readSuperPrompt } from "../../../_redux/actions/content";


export default function ReviewPromptPage() {
	const { id } = useParams() || {};

	const [superPrompt, setSuperPrompt] = useState([]);
	const [proposedPrompts, setProposedPrompts] = useState([]);
	const [acceptedPrompts, setAcceptedPrompts] = useState([]);

	const [tableData, setTableData] = useState([]);

	const { account = {} } = useSelector((state) => state.user || {});

	const { products = [] } = useSelector((state) => state.products || {});
	const product = products.find((p) => p.id === id) || {};

	const paid = 0; //TODO

	useEffect(() => {
		readPrompts(product?.persona, true).then(r => {
			console.log(r)
			setProposedPrompts(r?.data || []);

			const data = [];
			(r?.data || []).forEach((d) => {
				console.log(d)
				data.push({
					id: d.id,
					title: d.text,
					submission_date: d.ts,
					model: product?.persona,
					status: SubmitionStatus.pending,
					earnings: 0,
				});
			})
			setTableData(data);
		});

		readPrompts(product?.persona, false).then(r => {
			console.log(r)
			setAcceptedPrompts(r?.data || []);
		});

		readSuperPrompt(product?.persona).then(r => {
			console.log(r)
			setSuperPrompt(r?.data || []);
		});
	}, [ product?.id ]);

	return (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget
					tabs={TabsHelper.getTabs({ id, tab: "Review Prompts", account })}
				/>
			</AppHeader>

			<div className={s.content}>
				<div className={s.topCard}>
					<div className={s.cardContent}>
						<div className={s.title}>Super Prompt</div>
						<div className={s.text}>
							You are a guide who knows Paris very well.
						</div>
					</div>
					<div className={s.label}>
						Accepting prompts below will adapt the Super Prompt behind this
						Evolved AI Assistant.
					</div>
				</div>

				<div className={s.cards}>
					<div className={cx(s.card, s.active)}>
						<div className={s.title}>Active</div>
						<div className={s.value}>{acceptedPrompts.length}</div>
					</div>
					<div className={cx(s.card, s.inactive)}>
						<div className={s.title}>Inactive</div>
						<div className={s.value}>{proposedPrompts.length}</div>
					</div>

					<div className={cx(s.card, s.earnings)}>
						<div className={s.earned}>
							{formatAmount(paid, 2, false, 2)}{" "}
							<span>{AppConfig.CURRENCY} Paid Total</span>
						</div>
					</div>
				</div>

				<EarningsTable data={tableData} />
			</div>
		</div>
	);
}
