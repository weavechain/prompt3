import React, { useRef, useState } from "react";
import cx from "classnames";
import { Tooltip } from "reactstrap";

import { formatAmount } from "../../../../../helpers/Utils";

import s from "./BridgeAmount.module.scss";
import AppConfig from "../../../../../AppConfig";

export default function BridgeAmount({
	amount,
	title,
	tooltipText,
	isSelected,
}) {
	const tooltipRef = useRef(null);
	const [openTooltip, setOpenTooltip] = useState(false);

	const currency = AppConfig.CURRENCY;

	return (
		<div className={s.root}>
			<div
				className={s.panel}
				onMouseEnter={() => setOpenTooltip(true)}
				onMouseLeave={() => setOpenTooltip(false)}
			>
				<div className={s.amount} ref={tooltipRef}>
					{formatAmount(amount, 2, false, 2)} <span>{currency}</span>
				</div>
				<div className={cx(s.label, { [s.labelSelected]: isSelected })}>
					{title}
				</div>
			</div>

			{openTooltip && tooltipText ? (
				<Tooltip placement="top" target={tooltipRef} isOpen={true}>
					<p className="tooltip-text">{tooltipText}</p>
				</Tooltip>
			) : null}
		</div>
	);
}
