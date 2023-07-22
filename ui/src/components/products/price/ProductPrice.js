import React from "react";
import cx from "classnames";

import { formatAmount, numberToLocaleString } from "../../../helpers/Utils";

import s from "./ProductPrice.module.scss";

export default function ProductPrice({
	price,
	token,
	className = "",
	minDecimals = 0,
	suffix = "",
}) {
	return token ? (
		<div className={cx(s.root, className)}>
			<p>
				{price === 0
					? "0" // 2022.11.18 display 0 instead of free
					: price > 0
					? numberToLocaleString(formatAmount(price, 2, false, minDecimals))
					: ""}
			</p>
			<span>
				&nbsp;
				{token} {suffix}
			</span>
		</div>
	) : null;
}
