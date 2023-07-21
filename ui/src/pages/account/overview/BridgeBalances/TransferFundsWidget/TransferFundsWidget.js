import React, { useEffect, useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button, Card, CardBody } from "reactstrap";

import cx from "classnames";

import { formatAmount } from "../../../../helpers/Utils";
import WeaveInputWidget from "../../../WeaveInputWidget/WeaveInputWidget";
import TableCell from "../../../tables/table-cell/TableCell";
import ArrowRightIcon from "../../../Icon/icons/account/ArrowRightIcon";
import AccountHelper from "../../../../helpers/AccountHelper";
import TRANSFER_FUNDS_TYPES from "../../../../data/TransferFundsTypes";

import ts from "../../../tables/Table.module.scss";
import s from "./TransferFundsWidget.module.scss";
import AppConfig from "../../../../../AppConfig";

export default function TransferFundsWidget({
	user,
	transferType,
	updateUser = () => {},
}) {
	const [amount, setAmount] = useState(0);
	const [transferData, setTransferData] = useState(null);

	const account = user?.account || {};
	const balanceTypes = AccountHelper.getBalanceTypes(account);
	const currency = AppConfig.CURRENCY;

	useEffect(() => {
		const data =
			transferType === TRANSFER_FUNDS_TYPES.lockedToWithdrawable
				? {
						from: balanceTypes.locked,
						to: balanceTypes.withdrawable,
				  }
				: {
						from: balanceTypes.withdrawable,
						to: balanceTypes.locked,
				  };

		setAmount(0);
		setTransferData({ ...data, transferType });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transferType, user]);

	if (!transferData) return null;

	// Balances
	const balances = [transferData.from, transferData.to];
	const maxAmount = 1 * transferData?.from?.current;

	// ------------------------------------- METHODS -------------------------------------
	const onChanged = (val) => {
		if (val > maxAmount) return;
		setAmount(val);
	};

	const transferAmount = () => {
		//close();

		const fromField = transferData?.from?.accountField;
		const toField = transferData.to.accountField;

		if (
			!account.hasOwnProperty(fromField) ||
			!account.hasOwnProperty(toField)
		) {
			return;
		}

		const fromAmount = account[fromField];
		const toAmount = account[toField];

		updateUser({
			...account,
			[fromField]: Math.max(0, fromAmount - amount),
			[toField]: +toAmount + +amount,
		});

		setAmount(0);
	};

	// ------------------------------------- FORMATS -------------------------------------
	const sourceFormatter = (cell, row, _, index) => {
		return <p className={s.source}>{index === 0 ? "From" : "To"} </p>;
	};

	const genericFormatter = (cell) => {
		return <TableCell text={cell} />;
	};

	const amountFormatter = (cell) => {
		return <TableCell text={formatAmount(cell)} />;
	};

	const arrowFormatter = (cell, row, _, index) => {
		return <ArrowRightIcon color={index === 0 ? "#DC3545" : "#17AD92"} />;
	};

	const newAmountFormatter = (cell, row, _, index) => {
		const funds = index === 0 ? Math.max(0, cell - amount) : +cell + +amount;
		return <div className={s.amount}>{formatAmount(funds)}</div>;
	};

	return (
		<Card className={s.root}>
			<CardBody className={s.cardBody}>
				<div className={s.amountContainer}>
					<div className={s.content}>
						<div className={s.inputContainer}>
							<WeaveInputWidget
								value={formatAmount(amount)}
								placeholder="ex. 0.00"
								icon={currency}
								title="Amount to transfer"
								label={`Enter a value, up to the maximum of ${formatAmount(
									1 * maxAmount
								)} ${currency}`}
								onChange={onChanged}
							/>

							<div className={s.max} onClick={() => setAmount(maxAmount)}>
								MAX
							</div>
						</div>
					</div>
				</div>

				<div className={s.tableContainer}>
					<div className={cx(ts.root, s.table)}>
						<BootstrapTable
							data={balances}
							className={ts.weavetable}
							version="4"
						>
							<TableHeaderColumn dataField="id" isKey hidden>
								ID
							</TableHeaderColumn>
							<TableHeaderColumn
								dataField="name"
								dataFormat={sourceFormatter}
								width="60"
							>
								&nbsp;
							</TableHeaderColumn>
							<TableHeaderColumn
								dataField="name"
								dataFormat={genericFormatter}
								width="140"
							>
								Balances
							</TableHeaderColumn>

							<TableHeaderColumn
								dataField="current"
								dataFormat={amountFormatter}
								width="140"
							>
								Current ({currency})
							</TableHeaderColumn>

							<TableHeaderColumn
								dataField="current"
								dataFormat={arrowFormatter}
								width="50"
							/>

							<TableHeaderColumn
								dataField="new"
								dataFormat={newAmountFormatter}
								width="121"
							>
								New ({currency})
							</TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>

				<div className={s.buttons}>
					<Button
						color={"info"}
						onClick={transferAmount}
						disabled={amount > maxAmount || !amount}
					>
						Confirm Transfer
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
