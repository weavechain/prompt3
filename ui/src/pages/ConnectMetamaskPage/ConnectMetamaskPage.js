import React, { useState } from "react";
import { Container } from "reactstrap";
import { useMetaMask } from "metamask-react";
import { useHistory } from "react-router-dom";

import AppConfig from "../../AppConfig";

import s from "./ConnectMetamaskPage.module.scss";

import MetamaskConfirmationDialog from "../../components/metamask/MetamaskConfirmationDialog/MetamaskConfirmationDialog";
//import TermsDialog from "../../components/metamask/TermsDialog/TermsDialog";
import DownloadMetamaskDialog from "../../components/metamask/DownloadMetamaskDialog/DownloadMetamaskDialog";
import MetamaskConnectPanel from "../../components/metamask/MetamaskConnectPanel/MetamaskConnectPanel";
import AppHeader from "../../components/AppHeader/AppHeader";
import MetamaskCheckHelper from "../../helpers/MetamaskCheckHelper";

export default function ConnectMetamaskPage() {
	const history = useHistory();
	const { status, connect } = useMetaMask();

	//const [showTermsDialog, setShowTermsDialog] = useState(false);
	const [showDownloadDialog, setShowDownloadDialog] = useState(false);
	const [downloadStarted, setDownloadStarted] = useState(false);

	const showDownloadMetamask = status === "unavailable";

	// ------------------------------------- METHODS -------------------------------------
	const connectToMetamask = () => {
		connect().then(() => {
			history.push("/");
		});
	};

	const acceptTerms = () => {
		//setShowTermsDialog(false);

		// Not installed
		if (showDownloadMetamask) {
			setShowDownloadDialog(true);
		} else {
			connectToMetamask();
		}
	};

	const downloadMetamask = () => {
		setShowDownloadDialog(false);
		setDownloadStarted(true);
		window.open(AppConfig.METAMASK_DOWNLOAD_URL, "_blank");
	};

	return (
		<Container fluid className={s.root}>
			<MetamaskCheckHelper triggered={downloadStarted} />

			<AppHeader />

			{status === "connecting" ? <MetamaskConfirmationDialog /> : null}

			{/* {showTermsDialog ? (
				<TermsDialog
					onContinue={acceptTerms}
					close={() => setShowTermsDialog(false)}
				/>
			) : null} */}

			{showDownloadDialog ? (
				<DownloadMetamaskDialog
					onContinue={downloadMetamask}
					close={() => setShowDownloadDialog(false)}
				/>
			) : null}

			<div className={s.content}>
				<div className={s.title}>Connect Wallet</div>

				<div className={s.description}></div>

				<MetamaskConnectPanel onLogin={acceptTerms} />
			</div>
		</Container>
	);
}
