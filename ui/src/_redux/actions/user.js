import DEFAULT_DEMO_DATA from "../../_mocks/DEFAULT_DEMO_DATA";
import LOCAL_STORAGE from "../../helpers/localStorage";
import { ActionTypes } from "../constants";
import { checkBalance } from "./content";

export const initAccount = () => {
	return (dispatch) => {
		checkBalance().then(b => {
			console.log(b)
			let balance
			if (b.res === 'err') {
				balance = 0
			} else {
				balance = parseFloat(b.data) / 1_000_000
			}
			let acc = {...DEFAULT_DEMO_DATA.account, balance: balance}
			dispatch({
				type: ActionTypes.INIT_ACCOUNT,
				account: acc,
			});
		})
		
	};
};

export const loginUser = (user) => {
	return (dispatch) => {
		let oldState = LOCAL_STORAGE.loadState() || {};
		LOCAL_STORAGE.saveState({
			...(oldState || {}),
			user,
		});

		return new Promise((resolve) => {
			dispatch({
				type: ActionTypes.LOGIN_SUCCESS,
				user,
			});

			resolve("success");
		});
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		return new Promise((resolve) => {
			LOCAL_STORAGE.saveState({});

			dispatch({
				type: ActionTypes.LOGOUT_SUCCESS,
				isFetching: false,
				isAuthenticated: false,
			});
			resolve("success");
		});
	};
};
