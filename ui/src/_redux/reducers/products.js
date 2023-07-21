import { ActionTypes } from "../constants/index";

export default function products(state = {}, action = "") {
	switch (action.type) {
		case ActionTypes.INIT_PRODUCTS:
			return Object.assign({}, state, {
				products: action.products,
				CURRENT_PRODUCT: action.products[0],
			});

		default:
			return state;
	}
}
