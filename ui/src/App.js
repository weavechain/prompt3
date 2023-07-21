import React from "react";
import { HashRouter } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

import "./assets/styles/theme.scss";

import AppRouter from "./pages/AppRouter";

class App extends React.PureComponent {
	render() {
		return (
			<HashRouter>
				<MetaMaskProvider>
					<AppRouter />
				</MetaMaskProvider>
			</HashRouter>
		);
	}
}

export default App;
