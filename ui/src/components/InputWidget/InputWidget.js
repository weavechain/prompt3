import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import cx from "classnames";
import { useDebounce } from "../../helpers/useDebounce";

import s from "./InputWidget.module.scss";

export default function InputWidget(props) {
	const {
		value = "",
		placeholder = "ex. 0.05",
		disabled,
		title = "",
		titleClass = "",
		className = "",
		label = "",
		maxLength = 0,
		onChange = () => {},
		type = "text",
		validationError = "",
		isMandatory = false,
		validationRegex,
	} = props;
	const [valueText, setValueText] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const debounceValue = useDebounce(valueText, 300);

	useEffect(() => {
		setValueText(value);
	}, [value]);

	useEffect(() => {
		setErrorMessage(validationError);
	}, [validationError]);

	useEffect(() => {
		if (debounceValue) {
			// Validate
			if (validationRegex) {
				const pattern = new RegExp(validationRegex, "gi");

				try {
					if (pattern.test(debounceValue)) {
						setErrorMessage(null);
						onChange(debounceValue);
					} else {
						setErrorMessage("Please enter a valid value!");
					}
				} catch (error) {
					console.debug(error);
				}
			} else {
				setErrorMessage(null);
				onChange(debounceValue);
			}
		}
		// eslint-disable-next-line
	}, [debounceValue]);

	return (
		<div className={cx(s.root, className)}>
			{title && (
				<div className={cx(s.title, titleClass, { [s.error]: !!errorMessage })}>
					{title} {isMandatory && <span className="mandatory">*</span>}
				</div>
			)}
			<Input
				value={valueText || ""}
				onChange={(e) => setValueText(e.target.value)}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				className={cx(s.input, { [s.error]: !!errorMessage })}
				{...(maxLength && { maxLength: maxLength })}
			/>

			{label && <p className={s.label}>{label}</p>}

			{errorMessage ? <p className={s.errorMessage}>{errorMessage}</p> : null}
		</div>
	);
}
