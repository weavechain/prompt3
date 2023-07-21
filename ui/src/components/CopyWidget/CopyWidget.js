import React, { useState, useEffect, useRef } from "react";
import { FormGroup, Input, Tooltip } from "reactstrap";

import cx from "classnames";

import AppConfig from "../../AppConfig";

import s from "./CopyWidget.module.scss";
import CopyDoneIcon from "../../components/icons/CopyDoneIcon";
import CopyIcon from "../../components/icons/CopyIcon";
import CheckIcon from "../icons/CheckIcon";

const CopyWidget = ({
	text,
	placeholder,
	disabled = false,
	showCopiedConfirmation = false,
	className = "",
	subText = "",
	customIcons = null,
	title,
	inputStyle = {},
	customIcon,
}) => {
	const [value, setValue] = useState(text);
	const [isCopied, setIsCopied] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const tooltipRef = useRef();

	const placeholderText = placeholder || "ex. " + AppConfig.samplePublicKey;

	const IconTag = isCopied ? CopyDoneIcon : CopyIcon;

	useEffect(() => {
		setValue(text);
	}, [text]);

	const copyToClipboard = async () => {
		if (!value) return;

		setIsCopied(true);
		setTooltipOpen(false);

		setTimeout(() => {
			setTooltipOpen(true);
		}, 10);

		if ("clipboard" in navigator) {
			return navigator.clipboard.writeText(value);
		} else {
			return document.execCommand("copy", true, value);
		}
	};

	const closeTooltip = () => {
		setTooltipOpen(false);
		//setIsCopied(false);
	};

	return (
		<div className={s.root}>
			{title && <>{title}</>}

			<div className={cx(s.container, inputStyle)}>
				<FormGroup className={s.copyWidget}>
					<Input
						className={cx(
							s.copyInput,
							className,
							value ? "" : s.placeholder,
							isCopied ? s.valid : ""
						)}
						placeholder={placeholderText}
						value={value || ""}
						onChange={() => {}}
						disabled={disabled}
						onClick={copyToClipboard}
					/>
					{subText && <p className={s.inputSubText}>{subText}</p>}
					{isCopied && showCopiedConfirmation && (
						<p className={cx(s.inputSubText, s.copied)}>Copied!</p>
					)}

					<div className={s.icons}>
						{isCopied && <CheckIcon />}

						<div
							className={s.iconContainer}
							ref={tooltipRef}
							onMouseEnter={() => setTooltipOpen(true)}
							onMouseLeave={closeTooltip}
							onClick={copyToClipboard}
						>
							{customIcon ? (
								<>{customIcon}</>
							) : (
								<IconTag color={"var(--app-color)"} width={20} height={20} />
							)}
						</div>

						{tooltipOpen ? (
							<Tooltip placement="bottom" target={tooltipRef} isOpen={true}>
								<p className="tooltip-text">
									{isCopied ? "Copied" : "Copy to clipboard"}
								</p>
							</Tooltip>
						) : null}

						{customIcons}
					</div>
				</FormGroup>
			</div>
		</div>
	);
};
export default CopyWidget;
