import { ActionTypes } from "../constants";

import DEFAULT_DEMO_DATA from "../../_mocks/DEFAULT_DEMO_DATA";
import LOCAL_STORAGE from "../../helpers/localStorage";

export const initSubmissions = (showAccepted) => {
	const stateData = LOCAL_STORAGE.loadState() || {};

	const submissions = stateData.showAccepted
		? DEFAULT_DEMO_DATA.submissions_accepted || []
		: DEFAULT_DEMO_DATA.submissions || [];

	const mocked = true;

	if (mocked) {
		(submissions?.earningsData || []).forEach((r) => {
			console.log(r);
			r.title = stateData.lastSubmit || r.title;
		});
	}

	return (dispatch) => {
		dispatch({
			type: ActionTypes.INIT_SUBMISSIONS,
			submissions,
		});
	};
};

export const updateSubmission = (data) => {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch({
				type: ActionTypes.UPDATE_SUBMISSION,
				submission: data,
			});
			resolve("success");
		});
	};
};
