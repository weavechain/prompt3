import React, { useState, useEffect } from "react";
import cx from "classnames";
import { BootstrapTable } from "react-bootstrap-table";
import { useHistory } from "react-router";
import { escapeRegexp, getKeyByValue } from "../../../helpers/Utils";

import s from "./EarningsTable.module.scss";

//import { getUserTimezone } from "../../../helpers/Utils";
import AppConfig from "../../../AppConfig";
import MoneyCounter from "../../../components/MoneyCounter/MoneyCounter";
import TableCell from "../../../components/TableCell/TableCell";
import TableSearch from "../../../components/TableSearch/TableSearch";
import TableHeaderCol from "../../../components/TableHeaderCol/TableHeaderCol";
import ViewIcon from "../../../components/icons/ViewIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import SubmitionStatus from "../../../helpers/models/SubmitionStatus";
import StopLicenseDialog from "../../../components/dialogs/StopLicenseDialog/StopLicenseDialog";

const PAGE_SIZE = AppConfig.PAGE_SIZE;

export default function EarningsTable({ data = [] }) {
	const history = useHistory();
	const [dataList, setDataList] = useState(data);
	const [searchText, setSearchText] = useState("");
	const [selectedModel, setSelectedModel] = useState(null);
	const currency = AppConfig.CURRENCY;

	useEffect(() => {
		setDataList(data);
	}, [data]);

	// ------------------------------------- METHODS -------------------------------------
	const search = (term) => {
		let filteredData = data || [];

		// Multi terms search
		if (term) {
			let pattern = "";
			try {
				pattern = new RegExp(escapeRegexp(term).split(" ").join("|"), "gi");
			} catch (error) {}

			filteredData = filteredData.filter(
				(a) => a.title?.match(pattern) || a.model?.match(pattern)
			);
		}

		setDataList([...filteredData]);
	};

	const goTo = (page) => {
		history.push(page);
	};

	// ------------------------------------- FORMATS -------------------------------------
	const defaultFormatter = (cell) => {
		return <TableCell type="name" text={cell} searchText={searchText} />;
	};

	const modelFormatter = (cell) => {
		return <TableCell type="amount" text={cell} searchText={searchText} />;
	};

	/* 	const dateFormatter = (cell, row) => {
		return (
			<TableCell
				type="amount"
				text={cell}
				searchText={searchText}
				status={row.status}
			/>
		);
	}; */

	const statusFormatter = (cell) => {
		const status = getKeyByValue(SubmitionStatus, cell);

		return (
			<div
				className={cx(s.status, {
					[s.accepted]: cell === SubmitionStatus.accepted,
					[s.rejected]: cell === SubmitionStatus.rejected,
				})}
			>
				{status}
			</div>
		);
	};

	const earningsFormatter = (_, row) => {
		return <MoneyCounter data={{ ...row, status: row.status }} />;
	};

	const actionFormatter = (_, row) => {
		return (
			<div className={s.actions}>
				<div className={s.pencil} onClick={() => goTo(`#`)}>
					<ViewIcon width="16" height="16" />
				</div>

				{row.status !== SubmitionStatus.stopped ? (
					<div className={s.deleteIcon} onClick={() => setSelectedModel(row)}>
						<TrashIcon width="16" height="16" />
					</div>
				) : null}
			</div>
		);
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
				options={{
					sizePerPage: PAGE_SIZE,
					hideSizePerPage: true,
					prePage: "Previous",
					nextPage: "Next",
					toolBar: () => (
						<div className={s.toolbar}>
							<SectionTitleWidget title="Proposed Prompts" />
							<TableSearch
								className={s.search}
								fullWidth={false}
								searchText={searchText}
								setSearchText={setSearchText}
								search={search}
							/>
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
					title="Title"
					width="300"
				/>
				{/* <TableHeaderCol
					dataField="submission_date"
					dataFormat={dateFormatter}
					dataSort
					width="280"
					className={s.rightTh}
					title={`Submission Date ${getUserTimezone()}`}
				/> */}
				<TableHeaderCol
					dataSort
					dataField="model"
					columnClassName={s.highlight}
					className={s.rightTh}
					dataFormat={modelFormatter}
					title="Model"
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
					dataField="earnings"
					dataFormat={earningsFormatter}
					dataSort
					className={s.rightTh}
					title={`Earned (${currency})`}
					width="230"
				/>
				<TableHeaderCol
					dataField="actions"
					dataSort
					columnClassName={s.highlight}
					dataFormat={actionFormatter}
					title="Actions"
					width="260"
				>
					Action
				</TableHeaderCol>
			</BootstrapTable>
		</div>
	);
}
