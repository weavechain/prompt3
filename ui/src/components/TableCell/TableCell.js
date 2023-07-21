import React, { useRef, useState } from "react";
import { Tooltip } from "reactstrap";

import cx from "classnames";

import { useHistory } from "react-router";

import s from "./TableCell.module.scss";

import Highlighted from "../Highlighted/Highlighted";
import CopyDoneIcon from "../icons/CopyDoneIcon";
import CopyIcon from "../icons/CopyIcon";

export default function TableCell({
	popoverId,
	text,
	popoverText,
	type = "name",
	url,
	copyText = null,
	searchText = "",
	hasCopyIcon = false,
	disableCopy = false,
	showIconTooltip = false, // show tooltip only for icon hover
	textStyle = "",
	onRowClick = () => {},
}) {
	const history = useHistory();
	const [isCopied, setIsCopied] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [isCopyIconVisible, setIsCopyIconVisible] = useState(false);

	const popoverIdRef = useRef(popoverId);

	// ------------------------------------- METHODS -------------------------------------
	const onClick = () => {
		if (disableCopy) return;

		if (url) {
			history.push(url);
		} else {
			copyToClipboard();
		}
	};

	const copyToClipboard = async () => {
		setIsCopied(true);
		setTooltipOpen(false);

		const textToCopy = copyText || text;

		setTimeout(() => {
			setTooltipOpen(true);
		}, 10);

		if ("clipboard" in navigator) {
			return navigator.clipboard.writeText(textToCopy);
		} else {
			return document.execCommand("copy", true, textToCopy);
		}
	};

	const onMouseEnter = () => {
		//setIsCopied(false);
		if (hasCopyIcon) setIsCopyIconVisible(true);

		// Show tooltip only when hovering over the clipboard icon
		if (!showIconTooltip) setTooltipOpen(true);
	};

	const onMouseLeave = () => {
		setIsCopyIconVisible(false);
		setTooltipOpen(false);
		setIsCopied(false);
	};

	const openTooltip = () => {
		if (showIconTooltip) {
			setTooltipOpen(true);
		}
	};

	const closeTooltip = () => {
		if (showIconTooltip) {
			setTooltipOpen(false);
		}
	};

	return (
		<div
			className={cx(s.root, { [s.amount]: type === "amount" })}
			onClick={onRowClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div
				ref={!showIconTooltip ? popoverIdRef : null}
				className={s.highlighter}
			>
				<Highlighted
					onClick={onClick}
					className={textStyle}
					highlight={searchText}
					text={text || ""}
				/>
			</div>

			{isCopyIconVisible && (
				<div
					className={s.icon}
					ref={showIconTooltip ? popoverIdRef : null}
					onClick={copyToClipboard}
					onMouseEnter={openTooltip}
					onMouseLeave={closeTooltip}
				>
					{isCopied ? (
						<CopyDoneIcon />
					) : (
						<CopyIcon width="12" height="12" color={"#50b0f9"} />
					)}
				</div>
			)}

			{popoverText && tooltipOpen ? (
				<Tooltip placement="bottom" target={popoverIdRef} isOpen={true}>
					<p className="tooltip-text">{isCopied ? "Copied" : popoverText}</p>
				</Tooltip>
			) : null}
		</div>
	);
}
