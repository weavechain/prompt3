import React from "react";
import cx from "classnames";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import s from "./MetamaskStepsDialog.module.scss";

import { getMetamaskPurchaseSteps } from "./MetamaskSteps";
import AppConfig from "../../../AppConfig";

export default function MetamaskStepsDialog({
	network = {},
	step = 0,
	close = () => {},
}) {
	const { METAMASK_STEPS_ICONS } = AppConfig;

	const STEPS = getMetamaskPurchaseSteps(METAMASK_STEPS_ICONS, {
		network,
	});
	const currentStep = STEPS[step];

	return currentStep == null ? null : (
		<Modal centered isOpen={true} className={cx(s.root, "dialog-md")}>
			<ModalHeader toggle={close}>
				<p className={s.title}>Complete transaction in Metamask</p>
			</ModalHeader>

			<ModalBody>
				<div className={s.current}>
					<img src={currentStep.image} alt="name" />
				</div>
			</ModalBody>

			<ModalFooter>
				<div className={s.footer}>
					<div className={s.steps}>
						{STEPS.map(({ name, id }, index) => (
							<div
								key={id}
								className={cx(s.step, index <= step ? s.active : "")}
							>
								<div className={s.link}></div>
								<img
									src={
										index < step
											? METAMASK_STEPS_ICONS.CompletedIcon
											: index === step
											? METAMASK_STEPS_ICONS.ActiveIcon
											: METAMASK_STEPS_ICONS.InActiveIcon
									}
									alt="..."
								/>
								<p className={s.name}>{name}</p>
							</div>
						))}
					</div>

					<p className={s.description}>{currentStep.description}</p>
				</div>
			</ModalFooter>
		</Modal>
	);
}
