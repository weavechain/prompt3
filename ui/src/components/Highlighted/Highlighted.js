import React from "react";
import cx from "classnames";
import DOMPurify from "dompurify";

import s from "./Highlighted.module.scss";

export default function Highlighted({
	text = "",
	highlight = "",
	className = "",
	onClick = () => {},
}) {
	let displayText = text;

	if (text && highlight) {
		const regex = new RegExp(highlight.trim() + "(?!([^<]+)?<)", "gi");

		displayText = text.replace(
			regex,
			'<b style="background-color:#faff07;">$&</b>'
		);
	}

	return (
		<div onClick={onClick} className={cx(s.root, className)}>
			<span
				className={s.text}
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(displayText),
				}}
			/>
		</div>
	);
}
