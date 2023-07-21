import { ActionTypes } from "../constants/index";

export default function auth(
	state = {
		isFetching: false,
		user: null,
	},
	action = ""
) {
	switch (action.type) {
		case ActionTypes.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				user: action.user,
				isAuthenticated: true,
			});
		case ActionTypes.LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: false,
			});
		case ActionTypes.INIT_ACCOUNT:
			return Object.assign({}, state, {
				account: action.account,
			});

		default:
			return state;
	}
}
