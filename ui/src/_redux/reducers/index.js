import { combineReducers } from "redux";
import user from "./user";
import products from "./products";
import submissions from "./submissions";

export default combineReducers({
	user,
	products,
	submissions,
});
