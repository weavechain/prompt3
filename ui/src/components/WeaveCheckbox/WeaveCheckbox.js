import React from "react";
import Checkbox from "react-custom-checkbox";

import Icon from "../Icon/Icon";
import s from "./WeaveCheckbox.module.scss";

const WeaveCheckbox = ({
	checked = false,
	disabled = false,
	label = "",
	onChange = () => {},
	labelStyle = null,
	size = 18,
	borderWidth = 2,
}) => {
	const labelStyles = labelStyle || {
		cursor: "pointer",
		marginLeft: 8,
		userSelect: "none",
		fontFamily: "Poppins-Medium",
		fontWeight: "bold",
		color: "#1A1C21",
		fontSize: "14px",
		lineHeight: "21px",
	};

	const bgStyle = checked
		? disabled
			? { backgroundColor: "#78909C" }
			: { backgroundColor: "var(--accountable-blue)" }
		: {};

	const borderColor = checked
		? disabled
			? "#78909C"
			: "var(--accountable-blue)"
		: "#D9DBE1";

	return (
		<Checkbox
			size={size}
			onChange={onChange}
			checked={checked}
			disabled={disabled}
			icon={<Icon icon="checkWhite" />}
			className={s.checkbox}
			style={bgStyle}
			borderColor={borderColor}
			borderWidth={borderWidth}
			label={label}
			labelStyle={labelStyles}
		/>
	);
};
export default WeaveCheckbox;
