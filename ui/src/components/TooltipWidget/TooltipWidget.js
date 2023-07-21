import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { Tooltip } from "reactstrap";

import s from "./TooltipWidget.module.scss";

export default function TooltipWidget(props) {
	const [tooltipOpen, setTooltipOpen] = useState(!!props.isOpen);

	const tooltipRef = useRef(null);
	const placement = props.placement || "bottom";

	useEffect(() => {
		setTooltipOpen(props.isOpen);
	}, [props.isOpen]);

	return (
		<div
			className={cx(s.root, props.className)}
			ref={tooltipRef}
			onClick={props.onClick ? props.onClick : () => {}}
			onMouseEnter={() => setTooltipOpen(true)}
			onMouseLeave={() => setTooltipOpen(false)}
		>
			{props.children ? <>{props.children}</> : null}

			{tooltipOpen && props.tooltipText ? (
				<Tooltip
					placement={placement}
					target={tooltipRef}
					isOpen={true}
					className={props.hasErrors ? "tooltip-error" : ""}
				>
					<p className="tooltip-text">{props.tooltipText}</p>
				</Tooltip>
			) : null}
		</div>
	);
}
