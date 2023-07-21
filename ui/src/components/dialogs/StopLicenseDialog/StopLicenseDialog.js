import React from "react";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { updateSubmission } from "../../../_redux/actions/submissions";

import s from "./StopLicenseDialog.module.scss";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import SubmitionStatus from "../../../helpers/models/SubmitionStatus";

export default function StopLicenseDialog({ data = {}, onCancel = {} }) {
	const dispatch = useDispatch();

	// ------------------------------------- METHODS -------------------------------------
	const stop = () => {
		dispatch(
			updateSubmission({ ...data, status: SubmitionStatus.stopped })
		).then(() => {
			onCancel();
		});
	};

	return (
		<ConfirmDialog
			isOpen={true}
			title="Are you sure?"
			description={"Confirm you want to stop licensing to the following Model:"}
			message={"test"}
			buttons={[
				{
					action: onCancel,
					text: "Cancel",
					color: "danger",
					isEmpty: true,
					isCancel: true,
				},
				{
					action: stop,
					text: "Stop Licensing",
					color: "danger",
				},
			]}
		>
			<div className={s.root}>
				<Input disabled className={s.input} value={data.model} />
				<span className={s.inputInfo}>{data.name}</span>
			</div>
		</ConfirmDialog>
	);
}
