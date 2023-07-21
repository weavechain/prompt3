import React from "react";
import cx from "classnames";

import s from "./SubmissionsCards.module.scss";

export default function SubmissionsCards({ submissions }) {
	return (
		<div className={s.root}>
			<div className={cx(s.card, s.accepted)}>
				<div className={s.title}>Accepted</div>
				<div className={s.value}>{submissions.accepted}</div>
			</div>
			<div className={cx(s.card, s.rejected)}>
				<div className={s.title}>Rejected</div>
				<div className={s.value}>{submissions.rejected}</div>
			</div>
			<div className={cx(s.card, s.pending)}>
				<div className={s.title}>Pending</div>
				<div className={s.value}>{submissions.pending}</div>
			</div>
			<div className={cx(s.card, s.submitted)}>
				<div className={s.title}>Submitted</div>
				<div className={s.value}>{submissions.submitted}</div>
			</div>
		</div>
	);
}
