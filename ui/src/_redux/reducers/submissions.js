import { ActionTypes } from "../constants/index";

export default function submissions(state = {}, action = "") {
	switch (action.type) {
		case ActionTypes.INIT_SUBMISSIONS:
			return Object.assign({}, state, {
				submissions: action.submissions,
			});

		case ActionTypes.UPDATE_SUBMISSION:
			const submission = action.submission;
			const earningsData = (state.submissions?.earningsData || []).map((s) =>
				s.id === submission.id ? submission : s
			);

			return Object.assign({}, state, {
				submissions: { ...state.submissions, earningsData },
			});

		default:
			return state;
	}
}
