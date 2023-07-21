import React from "react";
import { Switch, Route, useRouteMatch } from "react-router";

import ReviewPromptPage from "./ReviewPrompt/ReviewPromptPage";
import AskPromptPage from "./AskPrompt/AskPromptPage";
import CheckInclusionPage from "./CheckInclusion/CheckInclusionPage";
import SubmissionPage from "./SubmissionPage/SubmissionPage";

export default function ProductIndex() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route path={`${path}/submit`} exact component={SubmissionPage} />
			<Route path={`${path}/check`} exact component={CheckInclusionPage} />
			<Route path={`${path}/review`} exact component={ReviewPromptPage} />
			<Route path={`${path}/`} component={AskPromptPage} />
		</Switch>
	);
}
