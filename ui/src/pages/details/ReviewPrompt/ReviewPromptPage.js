import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { readPrompts, readSuperPrompt } from "../../../_redux/actions/content";
import { formatAmount, hasItems } from "../../../helpers/Utils";

import s from "./ReviewPromptPage.module.scss";
import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import AppConfig from "../../../AppConfig";
import TabsHelper from "../../../helpers/TabsHelper";
import SubmitionStatus from "../../../helpers/models/SubmitionStatus";
import MerkleBlackIcon from "../../../components/icons/MerkleBlackIcon";
import SuperPromptDialog from "../../../components/dialogs/SuperPromptDialog.js/SuperPromptDialog";
import PromptsTable from "./PromptsTable";
import { initAccount } from "../../../_redux/actions/user";
import { useDispatch } from "react-redux";

export default function ReviewPromptPage() {
	const dispatch = useDispatch();
	const { id } = useParams() || {};

	// eslint-disable-next-line no-unused-vars
	const [superPrompt, setSuperPrompt] = useState([]);
	const [proposedPrompts, setProposedPrompts] = useState([]);
	const [acceptedPrompts, setAcceptedPrompts] = useState([]);

	const [inactive, setInactive] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [showSuperDialog, setShowSuperDialog] = useState(false);

	const { account = {} } = useSelector((state) => state.user || {});

	const { products = [] } = useSelector((state) => state.products || {});
	const product = products.find((p) => p.id === id) || {};

	const paid = 0; //TODO

	const [tabs, setTabs] = useState([])

	useEffect(() => {
		TabsHelper.getTabs({ id, tab: "Review Prompts", account }).then(res => {
			setTabs(res)
		})
	}, [])

	const readData = () => {
		readPrompts(product?.persona, true).then((r) => {
			console.log(r);
			setProposedPrompts(r?.data || []);
		});

		readPrompts(product?.persona, false).then((r) => {
			console.log(r);
			setAcceptedPrompts(r?.data || []);
		});

		readSuperPrompt(product?.persona).then((r) => {
			console.log(r?.data);
			setSuperPrompt(r?.data && r?.data.length && r?.data.length > 0 ? r?.data[0]?.text || [] : [])
		});

		dispatch(initAccount());
	}

	useEffect(() => {
		readData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?.id]);

	useEffect(() => {
		const data = [];
		let acc = {};
		let proposed = {};

		(acceptedPrompts || []).forEach((d) => {
			acc[d.source + ":" + d.text] = true;
		});

		console.log(acc);

		(proposedPrompts || []).forEach((d) => {
			const exists = proposed[d.pubkey + ":" + d.text];
			if (!exists) {
				proposed[d.pubkey + ":" + d.text] = true;
				console.log(d);
				const accepted = acc[d.pubkey + ":" + d.text];
				data.push({
					id: d.id,
					title: d.text,
					submission_date: d.ts,
					model: product?.persona,
					status: accepted ? SubmitionStatus.accepted : SubmitionStatus.inactive,
					earnings: 0,
					cost: 5,
					submitted_by: d.pubkey,
				});
			}
		});

		setInactive(Object.keys(proposed).length - Object.keys(acc).length);
		setTableData(data);
	}, [acceptedPrompts, proposedPrompts]);


	return (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget
					tabs={TabsHelper.getTabs(tabs)}
				/>
			</AppHeader>

			{showSuperDialog ? (
				<SuperPromptDialog close={() => setShowSuperDialog(false)} />
			) : null}

			<div className={s.content}>
				<div className={s.topCard}>
					<div className={s.cardContent}>
						<div
							className={s.merkleIcon}
							onClick={() => setShowSuperDialog(true)}
						>
							<MerkleBlackIcon color={"#50b0f9"} />
						</div>

						<div className={s.title}>Super Prompt</div>
						<div className={s.text}>{superPrompt}</div>
					</div>
					<div className={s.label}>
						Accepting prompts below will adapt the Super Prompt that serves as
						the foundation for this Evolved AI Assistant.
					</div>
				</div>

				<div className={s.cards}>
					<div className={cx(s.card, s.active)}>
						<div className={s.title}>Active</div>
						<div className={s.value}>{acceptedPrompts.length}</div>
					</div>
					<div className={cx(s.card, s.inactive)}>
						<div className={s.title}>Inactive</div>
						<div className={s.value}>{inactive}</div>
					</div>

					<div className={cx(s.card, s.earnings)}>
						<div className={s.earned}>
							{formatAmount(paid, 2, false, 2)}{" "}
							<span>{AppConfig.CURRENCY} Paid Total</span>
						</div>
					</div>
				</div>

				<PromptsTable product={product} data={tableData} updateModel={() => readData()} />
			</div>
		</div>
	);
}
