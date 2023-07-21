import { ActionTypes } from "../constants";

import DEFAULT_DEMO_DATA from "../../_mocks/DEFAULT_DEMO_DATA";
import LOCAL_STORAGE from "../../helpers/localStorage";
import { escapeRegexp, hasItems } from "../../helpers/Utils";

export const initProducts = () => {
	const products = DEFAULT_DEMO_DATA.products || [];

	return (dispatch) => {
		dispatch({
			type: ActionTypes.INIT_PRODUCTS,
			products,
		});
	};
};

// ------------------------------------- GET -------------------------------------
const _getProducts = async (filters = {}) => {
	let stateData = LOCAL_STORAGE.loadState() || {};
	let listings = [];
	// DUMMY DATA
	if (stateData.useMocks) {
		return new Promise(async (resolve, reject) => {
			try {
				// Default dummy listings
				const PRODUCTS = DEFAULT_DEMO_DATA.products;
				//use PRODUCTS.default if/when reverting to a dynamic import
				listings = _filterDummyProducts(PRODUCTS, filters);

				resolve(listings);
			} catch (error) {
				reject(error);
			}
		});
	}
};

const _filterDummyProducts = (products = [], filters = {}) => {
	const { searchText, categories, showPurchased } = filters;

	let filteredListings = products || [];

	// Filter by search text
	if (searchText) {
		const pattern = new RegExp(
			escapeRegexp(searchText).split(" ").join("|"),
			"gi"
		);
		filteredListings = filteredListings.filter((a) => {
			return (
				a.title?.match(pattern) ||
				a.description?.match(pattern) ||
				a.category?.match(pattern)
			);
		});
	}

	// Show purchased items
	if (showPurchased) {
		filteredListings = filteredListings.filter((a) => !!a.purchase_date);
	}

	// Filter by categories
	if (hasItems(categories)) {
		filteredListings = filteredListings.filter((a) =>
			categories.includes(a.category.toLocaleLowerCase())
		);
	}

	return filteredListings;
};

// For demo data
export const setProducts = (listings) => {
	return (dispatch) => {
		dispatch({
			type: ActionTypes.MARKET_FETCH_LISTINGS_SUCCESS,
			isFetching: false,
			listings,
		});
	};
};

export const fetchListings = (filters = {}) => {
	return (dispatch) => {
		_getProducts(filters).then((listings) => {
			dispatch(setProducts(listings));

			dispatch({
				type: ActionTypes.MARKET_FETCH_LISTINGS_SUCCESS,
				isFetching: false,
				listings,
			});
		});
	};
};
