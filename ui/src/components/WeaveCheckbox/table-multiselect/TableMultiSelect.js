import React from "react";
import cx from "classnames";

const Checkbox = (props) => {
	return (
		<input
			className={cx(
				"react-bs-select-all",
				props.checked === "indeterminate" ? "half-checked" : ""
			)}
			type="checkbox"
			name={"checkbox" + props.rowIndex}
			id={"checkbox" + props.rowIndex}
			checked={props.checked}
			onChange={props.onChange}
		/>
	);
};

export default function TableMultiSelect(props) {
	const { type, checked, disabled, onChange, rowIndex } = props;

	return rowIndex === "Header" ? (
		<div className="weave-checkbox">
			<Checkbox {...props} />
			<label htmlFor={"checkbox" + rowIndex}>
				<div className="check"></div>
			</label>
		</div>
	) : (
		<div className="weave-checkbox">
			<input
				type={type}
				name={"checkbox" + rowIndex}
				id={"checkbox" + rowIndex}
				checked={checked}
				disabled={disabled}
				onChange={(e) => onChange(e, rowIndex)}
				ref={(input) => {
					if (input) {
						input.indeterminate = props.indeterminate;
					}
				}}
			/>
			<label htmlFor={"checkbox" + rowIndex}>
				<div className="check"></div>
			</label>
		</div>
	);
}
