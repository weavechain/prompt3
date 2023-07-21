import React from "react";
import cx from "classnames";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


import s from "./TermsDialog.module.scss";
import AppConfig from "../../../AppConfig";

export default function TermsDialog({
	onContinue = () => {},
	close = () => {},
	theme = "",
}) {
	return (
		<Modal centered isOpen={true} className={cx(s.root, "dialog-md", theme)}>
			<ModalHeader toggle={close}>
				<p className={cx(s.title, theme === "dark" ? s.dark : "")}>
					Welcome to Prompt3!
				</p>
			</ModalHeader>

			<ModalBody>
				<p className={cx(s.description, theme === "dark" ? s.dark : "")}>
					By connecting your wallet and using Prompt3, you agree to our{" "}
					<a href={AppConfig.TERMS_URL} target="_blank" rel="noreferrer">
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href={AppConfig.PRIVACY_POLICY_URL}
						target="_blank"
						rel="noreferrer"
					>
						Privacy Policy
					</a>
					.
				</p>
			</ModalBody>

			<ModalFooter>
				<div className={s.buttons}>
					<Button color="info" className="btn-border" onClick={close}>
						Cancel
					</Button>
					<Button color="info" onClick={onContinue}>
						Accept & Sign
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
}
