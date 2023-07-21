import React from "react";
import { Switch, Route, useRouteMatch } from "react-router";

import SubmissionsPage from "./submissions/SubmissionsPage";
import AccountOverviewPage from "./overview/AccountOverviewPage";
import TransferFundsPage from "./transfer/TransferFundsPage";

export default function AccountIndex() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route
				exact
				path={`${path}/transfer-funds`}
				component={TransferFundsPage}
			/>
			<Route path={`${path}/submissions`} exact component={SubmissionsPage} />
			<Route path={`${path}`} component={AccountOverviewPage} />
		</Switch>
	);
}
