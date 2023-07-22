import React from "react";
import { Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

import s from "./AccountOverviewPage.module.scss";

import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import BridgeBalances from "./BridgeBalances/BridgeBalances";
import SignInDetails from "./SignInDetails/SignInDetails";

export default function AccountOverviewPage() {
	const { account = {} } = useSelector((state) => state.user || {});

	return (
		<div className={s.root}>
			<AppHeader title="Account">
				<TabsWidget
					tabs={[
						{
							title: "Overview",
							url: "/account/overview",
							isActive: true,
						},
						{
							title: "Submissions",
							url: "/account/submissions",
						},
						/*
						{
							title: "Transfer funds",
							url: "/account/transfer-funds",
						},
						 */
					]}
				/>
			</AppHeader>

			<div className={s.content}>
				<Row>
					<Col lg="8" sm="12">
						<SignInDetails account={account} />
					</Col>

					<Col lg="4" sm="12">
						{account && <BridgeBalances account={account} />}
					</Col>
				</Row>
			</div>
		</div>
	);
}
