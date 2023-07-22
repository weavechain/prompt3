import React, { useEffect } from "react";

import { Switch, Route, Redirect } from "react-router";
import { useMetaMask } from "metamask-react";
import { useDispatch } from "react-redux";

import { initProducts } from "../_redux/actions/products";
import { initSubmissions } from "../_redux/actions/submissions";
import { initAccount } from "../_redux/actions/user";

import ConnectMetamaskPage from "./ConnectMetamaskPage/ConnectMetamaskPage";
import HomePage from "./HomePage/HomePage";
import AccountIndex from "../pages/account/index";
import ProductIndex from "./details";
//import WalletHelper from "../helpers/WalletHelper";

export default function AppRouter() {
	const dispatch = useDispatch();
	//const [user, setUser] = useState(null);

	const meta = useMetaMask();
	// TODO:
	const isLoggedIn = true || !!meta.account;

	useEffect(() => {
		dispatch(initProducts());
		dispatch(initSubmissions());
		dispatch(initAccount());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ------------------------------------- METHODS -------------------------------------
	const PrivateRoute = ({ isLoggedIn, ...props }) => {
		return isLoggedIn ? <Route {...props} /> : <Redirect to={"/login"} />;
	};

	const AnonymousRoute = ({ isLoggedIn, ...props }) => {
		return isLoggedIn ? <Redirect to={"/"} /> : <Route {...props} />;
	};

	return (
		<Switch>
			<AnonymousRoute
				isLoggedIn={isLoggedIn}
				path="/login"
				exact
				component={ConnectMetamaskPage}
			/>

			<PrivateRoute
				isLoggedIn={isLoggedIn}
				path={"/"}
				exact
				component={HomePage}
			/>

			<PrivateRoute
				isLoggedIn={isLoggedIn}
				path={"/account"}
				component={AccountIndex}
			/>

			<PrivateRoute
				isLoggedIn={isLoggedIn}
				path={"/:id"}
				component={ProductIndex}
			/>
		</Switch>
	);
}
