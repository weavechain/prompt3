import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cx from "classnames";

import s from "./ConfirmDialog.module.scss";

export default function ConfirmDialog({
	isOpen,
	title,
	description,
	children,
	buttons = [],
}) {
	const cancel = buttons.find((b) => b.isCancel);
	const toggle = cancel?.action;

	return (
		<Modal centered isOpen={isOpen} className={s.root}>
			<ModalHeader toggle={toggle}>
				<p className={s.title}>{title}</p>
			</ModalHeader>

			<ModalBody>
				<p className={s.description}>{description}</p>
				{children && <div className={s.content}>{children}</div>}
			</ModalBody>

			<ModalFooter>
				{buttons.map(
					({ text, color, action, isEmpty, isLeftButton }, index) => (
						<Button
							key={index}
							color={color || "info"}
							className={cx(
								isEmpty ? "btn-border" : "",
								isLeftButton ? s.isLeftButton : ""
							)}
							onClick={action}
						>
							{text}
						</Button>
					)
				)}
			</ModalFooter>
		</Modal>
	);
}
