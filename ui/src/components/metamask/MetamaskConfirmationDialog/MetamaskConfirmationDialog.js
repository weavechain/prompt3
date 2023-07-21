import React from "react";
import cx from "classnames";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import s from "./MetamaskConfirmationDialog.module.scss";
import FoxIcon from "../../icons/FoxIcon";

export default function MetamaskConfirmationDialog({
	title = "Metamask",
	description = "Waiting for confirmation from Metamask",
	theme = "",
	hideFooter = false,
}) {
	return (
		<Modal centered isOpen={true} className={cx(s.root, "dialog-md", theme)}>
			<ModalHeader>
				<p className={cx(s.title, theme === "dark" ? s.dark : "")}>{title}</p>
			</ModalHeader>

			<ModalBody>
				<div className={s.iconContainer}>
					<FoxIcon width={120} />
				</div>

				<p className={cx(s.description, theme === "dark" ? s.dark : "")}>
					{description}
				</p>
			</ModalBody>

			{hideFooter ? null : (
				<ModalFooter>
					<div className={s.download}>
						<p>
							Don't have a wallet?{" "}
							<a
								href="https://metamask.io/download/"
								target="_blank"
								rel="noreferrer"
							>
								{" "}
								Download here
							</a>
						</p>
					</div>
				</ModalFooter>
			)}
		</Modal>
	);
}
