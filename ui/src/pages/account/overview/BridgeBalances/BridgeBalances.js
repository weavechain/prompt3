import React from "react";
import { Card, CardBody } from "reactstrap";

import BridgeAmountArrow from "./BridgeAmountArrow/BridgeAmountArrow";
import BridgeHistory from "./BridgeHistory/BridgeHistory";

import s from "./BridgeBalances.module.scss";

import BridgeAmount from "./BridgeAmount/BridgeAmount";
import MoneyBlackIcon from "../../../../components/icons/MoneyBlackIcon";
import AccountHelper from "../../../../helpers/AccountHelper";
import SectionTitleWidget from "../../../../components/SectionTitleWidget/SectionTitleWidget";

export default function BridgeBalances({
	account = { lockedAmount: 0, withdrawableAmount: 0 },
	hideHistory = false,
}) {
	const balanceTypes = AccountHelper.getBalanceTypes(account);
	const wallets = Object.values(balanceTypes);

	return (
		<Card className={s.root}>
			<CardBody className={s.cardBody}>
				<SectionTitleWidget
					icon={<MoneyBlackIcon />}
					title="Current Balances"
					rootClassName={s.sectionHeader}
				/>

				<div className={s.content}>
					{wallets.map(
						({ id, name, icons, tooltipText, transferTypes: tt, current }) => (
							<div className={s.section} key={id}>
								<BridgeAmount
									title={name}
									amount={current}
									tooltipText={tooltipText}
								/>

								{icons.map(({ direction, type }, index) => (
									<BridgeAmountArrow
										key={index}
										direction={direction}
										disabled
									/>
								))}
							</div>
						)
					)}
				</div>

				{hideHistory ? null : <BridgeHistory account={account} />}
			</CardBody>
		</Card>
	);
}
