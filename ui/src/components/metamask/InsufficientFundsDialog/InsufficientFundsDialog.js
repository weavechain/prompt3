import React from "react";
import cx from "classnames";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import s from "./InsufficientFundsDialog.module.scss";

import AppConfig from "../../../AppConfig";
import AppMessages from "../../../AppMessages";

export default function InsufficientFundsDialog({
	close = () => {},
	onContinue = () => {},
}) {
	const { INSUFFICIENT_FUNDS_IMG } = AppConfig;

	return (
		<Modal centered isOpen={true} className={cx(s.root, "dialog-md")}>
			<ModalHeader toggle={close}>
				<p className={s.title}>Insufficient Funds</p>
			</ModalHeader>

			<ModalBody>
				<div className={s.logoContainer}>
					<img src={INSUFFICIENT_FUNDS_IMG} alt="logo" />
				</div>

				<p className={s.description}>
					{AppMessages.InsufficientFundsDialogText}
				</p>
			</ModalBody>

			<ModalFooter>
				<div className={s.buttons}>
					<Button color="primary" className="btn-border" onClick={close}>
						Cancel
					</Button>
					<Button color="primary" onClick={onContinue}>
						Back
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
}
