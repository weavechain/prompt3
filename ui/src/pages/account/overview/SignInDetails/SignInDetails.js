import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { useMetaMask } from "metamask-react";

import s from "./SignInDetails.module.scss";

import SectionTitleWidget from "../../../../components/SectionTitleWidget/SectionTitleWidget";
import AvatarIcon from "../../../../components/icons/AvatarIcon";
import CopyWidget from "../../../../components/CopyWidget/CopyWidget";
import PencilIcon from "../../../../components/icons/PencilIcon";
import FoxIcon from "../../../../components/icons/FoxIcon";
import SubmissionsCards from "../cards/SubmissionsCards";
import { downloadFile } from "../../../../helpers/Utils";

export default function SignInDetails({ account }) {
	const { connect } = useMetaMask();

	const { publicKey } = account;
	const { submissions = [] } = useSelector((state) => state.submissions || {});

	// ------------------------------------- METHODS -------------------------------------
	const download = () => {
		downloadFile({
			data: JSON.stringify(account.privateKey),
			fileName: "key.pvk",
			fileType: "text/json",
		});
	};

	const connectToMetamask = () => {
		connect();
	};

	return (
		<div className={s.root}>
			<div className={s.section}>
				<SectionTitleWidget
					icon={<AvatarIcon color="#1a1c21" />}
					title="Sign In Details"
					rootClassName={s.sectionHeader}
				/>

				<div className={s.content}>
					<div className={s.description}>
						Copy your account's public key & save your private key to sign in
						from another session{" "}
						<span>
							**If you do not save your keys or connect Metamask, we can't help
							you recover your account!**
						</span>
					</div>

					<CopyWidget
						text={publicKey}
						disabled
						className={s.copyInput}
						titleStyle={s.copyTitle}
					/>

					<Button color="primary" className={s.button} onClick={download}>
						Download Private Key
					</Button>

					<div className={s.separator}>or</div>

					<Button
						color="primary"
						onClick={connectToMetamask}
						className={s.metamaskButton}
					>
						<FoxIcon width={40} height={40} />
						<span>Connect with Metamask</span>
					</Button>
				</div>
			</div>

			<div className={s.section}>
				<SectionTitleWidget
					icon={<PencilIcon color="#1a1c21" />}
					title="Submissions"
					rootClassName={s.sectionHeader}
				/>
				<div className={s.content}>
					<SubmissionsCards submissions={submissions} />
				</div>
			</div>
		</div>
	);
}
