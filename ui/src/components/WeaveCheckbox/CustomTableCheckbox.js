import React from "react";
import cx from "classnames";
import TooltipWidget from "../TooltipWidget/TooltipWidget";

export default function CustomTableCheckbox(props) {
	const {
		type,
		checked,
		disabled,
		onChange,
		rowIndex,
		pageSize,
		selected,
		total,
	} = props;

	// Show tooltip for intermediate selection state
	const tooltipText =
		checked &&
		rowIndex === "Header" &&
		selected >= pageSize &&
		selected !== total
			? `${selected} attachments on this page selected. Click again to select ${total} attachments on all pages`
			: null;

	return (
		<div className={"weave-checkbox"}>
			<TooltipWidget placement="top" tooltipText={tooltipText}>
				<input
					className={cx(
						rowIndex === "Header" ? "react-bs-select-all" : "",
						props.indeterminate ? "half-checked" : ""
					)}
					type={type || "checkbox"}
					name={"checkbox" + rowIndex}
					id={"checkbox" + rowIndex}
					checked={checked}
					disabled={disabled}
					onChange={onChange}
					ref={(input) => {
						if (input) {
							input.indeterminate = props.indeterminate;
						}
					}}
				/>
			</TooltipWidget>
		</div>
	);
}
