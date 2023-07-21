import React from "react";

import cx from "classnames";


import s from "./BridgeAmountArrow.module.scss";
import ArrowUpIcon from "../../../../../components/icons/ArrowUpIcon";
import ArrowDownIcon from "../../../../../components/icons/ArrowDownIcon";

export default function BridgeAmountArrow({
	direction = "up",
	disabled,
	isSelected,
	floatRight = false,
	onClick = () => {},
}) {
	const ICON_TAG = direction === "up" ? ArrowUpIcon : ArrowDownIcon;

	return (
		<div className={cx(s.root, { [s.floatRight]: floatRight })}>
			<div
				onClick={onClick}
				className={cx(s.icon, {
					[s.selectedIcon]: isSelected,
				})}
			>
				<ICON_TAG disabled={disabled} />
			</div>
		</div>
	);
}
