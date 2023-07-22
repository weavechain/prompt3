import React, { useState, useEffect } from "react";
import cx from "classnames";
import { BootstrapTable } from "react-bootstrap-table";
import { Button } from "reactstrap";
import {
	formatAmount,
	getKeyByValue,
	hasItems,
	trimKey,
} from "../../../helpers/Utils";
import { useDispatch } from "react-redux";

import s from "./PromptsTable.module.scss";

import AppConfig from "../../../AppConfig";
import TableCell from "../../../components/TableCell/TableCell";
import TableHeaderCol from "../../../components/TableHeaderCol/TableHeaderCol";
import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import SubmitionStatus from "../../../helpers/models/SubmitionStatus";
import StopLicenseDialog from "../../../components/dialogs/StopLicenseDialog/StopLicenseDialog";
import CustomTableCheckbox from "../../../components/WeaveCheckbox/CustomTableCheckbox";
import {distilPrompt} from "../../../_redux/actions/content";
import { toast } from "react-toastify";

const PAGE_SIZE = AppConfig.PAGE_SIZE;

export default function PromptsTable({ product, data = [], updateModel = () => {} }) {
	const [dataList, setDataList] = useState(data);
	const [searchText] = useState("");
	const [selected, setSelected] = useState([]);
	const [selectedModel, setSelectedModel] = useState(null);
	const [amount, setAmount] = useState(0);
	const [isGenerating, setIsGenerating] = useState(false);
	const [reponseText, setReponseText] = useState("");
	const currency = AppConfig.CURRENCY;

	const dispatch = useDispatch();

	useEffect(() => {
		setDataList(data);
	}, [data]);

	// ------------------------------------- METHODS -------------------------------------
	const onRowSelect = (st, isSelected) => {
		const selectedPrompts = new Set(selected);

		if (isSelected) {
			selectedPrompts.add(st.id);
		} else {
			selectedPrompts.delete(st.id);
		}

		const am = (dataList || []).reduce(
			(res, f) => res + 1 * (selectedPrompts.has(f.id) ? f.cost : 0),
			0
		);

		setAmount(am);
		setSelected(Array.from(selectedPrompts));
	};

	const payUser = () => {
		setIsGenerating(true);

		try {
			dispatch(distilPrompt(product?.persona)).then((result) => {
				setIsGenerating(false);
				console.log(result)
				if (result?.output) {
					setReponseText(result?.output);
					toast.success("Superprompt created");
				} else {
					toast.error("Problem while creating super prompt");
				}
			});
		} catch (error) {}
	};

	// ------------------------------------- FORMATS -------------------------------------
	const defaultFormatter = (cell) => {
		return <TableCell type="name" text={cell} searchText={searchText} />;
	};

	const submitterFormatter = (cell) => {
		return (
			<TableCell
				type="name"
				text={trimKey(cell, true)}
				searchText={searchText}
			/>
		);
	};

	const statusFormatter = (cell) => {
		const status = getKeyByValue(SubmitionStatus, cell);

		return (
			<div
				className={cx(s.status, {
					[s.active]: cell === SubmitionStatus.accepted,
					[s.inactive]: cell === SubmitionStatus.inactive,
				})}
			>
				{status}
			</div>
		);
	};

	const costFormatter = (cell) => {
		return <TableCell text={formatAmount(cell, 2, false, 2)} type="amount" />;
	};

	// ------------------------------------- END METHODS -------------------------------------
	return (
		<div className={s.root}>
			{selectedModel && (
				<StopLicenseDialog
					data={selectedModel}
					onCancel={() => setSelectedModel(null)}
				/>
			)}

			<BootstrapTable
				data={dataList}
				selectRow={{
					mode: "checkbox",
					bgColor: "#f5fafe",
					selected: selected,
					clickToSelect: true,
					columnWidth: "20px",
					onSelect: onRowSelect,
					customComponent: (props) => (
						<CustomTableCheckbox
							{...props}
							pageSize={PAGE_SIZE}
							selected={selected.length}
							total={dataList.length}
						/>
					),
				}}
				options={{
					sizePerPage: PAGE_SIZE,
					hideSizePerPage: true,
					prePage: "Previous",
					nextPage: "Next",

					toolBar: () => (
						<div className={s.toolbar}>
							<SectionTitleWidget title="Prompts for Review" />
							<div className={s.payButton}>
								<Button
									color="primary"
									disabled={!hasItems(selected)}
									onClick={payUser}
								>
									Pay {formatAmount(amount, 2, false, 2)} USDC to Generate Super
									Prompt
								</Button>
							</div>
						</div>
					),
				}}
				className={s.weavetable}
				search
				version="4"
				pagination={dataList.length > PAGE_SIZE}
				trClassName={s.confirmedRow}
			>
				<TableHeaderCol dataField="id" isKey hidden title="id" />
				<TableHeaderCol
					dataSort
					dataField="title"
					columnClassName={s.highlight}
					dataFormat={defaultFormatter}
					title="Prompt"
					width="300"
				/>

				<TableHeaderCol
					dataSort
					dataField="submitted_by"
					columnClassName={s.highlight}
					dataFormat={submitterFormatter}
					title="Submitted by"
					width="140"
				/>
				<TableHeaderCol
					dataSort
					dataField="status"
					columnClassName={s.highlight}
					dataFormat={statusFormatter}
					title="Status"
					width="140"
				/>
				<TableHeaderCol
					dataField="cost"
					dataFormat={costFormatter}
					dataSort
					className={s.rightTh}
					title={`Cost (${currency})`}
					width="230"
				/>
			</BootstrapTable>
		</div>
	);
}
