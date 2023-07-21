import React from "react";
import { Tooltip } from "reactstrap";

import { useState } from "react";
import { useRef } from "react";


import s from "./InfoBubble.module.scss";
import InfoIcon from "../icons/InfoIcon";

export default function InfoBubble({ title, tooltipText }) {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const tooltipRef = useRef();

	return (
		<div className={s.root}>
			<div className={s.infoText}>
				{title}
				<div
					ref={tooltipRef}
					className={s.imageContainer}
					onMouseEnter={() => setTooltipOpen(true)}
					onMouseLeave={() => setTooltipOpen(false)}
				>
					<InfoIcon color="#78909c" />
				</div>
			</div>

			{tooltipOpen && tooltipText && (
				<Tooltip placement="right" target={tooltipRef} isOpen={true}>
					<p className="tooltip-text">{tooltipText}</p>
				</Tooltip>
			)}
		</div>
	);
}
