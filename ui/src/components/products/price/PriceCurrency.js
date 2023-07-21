import React from "react";
import TooltipWidget from "../../TooltipWidget/TooltipWidget";
import PurchasedCheckIcon from "../../icons/price/PurchasedCheckIcon";
import GiftIcon from "../../icons/price/GiftIcon";
import DollarSignIcon from "../../icons/price/DollarSignIcon";
import KeyIcon from "../../icons/price/KeyIcon";

export default function PriceCurrency({ product = {}, price }) {
	const { purchase_date } = product;

	return purchase_date ? (
		<TooltipWidget tooltipText="Purchased">
			<PurchasedCheckIcon />
		</TooltipWidget>
	) : price === 0 ? (
		<GiftIcon color="#78909c" />
	) : price > 0 ? (
		<DollarSignIcon color="#78909c" />
	) : (
		<KeyIcon color="#78909c" width={16} height={14} />
	);
}
