import React from "react";

import s from "./VerifiedTextWidget.module.scss";
import VerifiedIcon from "../../components/icons/VerifiedIcon";

export default function VerifiedTextWidget({ text }) {
	return (
		<div className={s.root}>
			<VerifiedIcon />
			{text}
		</div>
	);
}
