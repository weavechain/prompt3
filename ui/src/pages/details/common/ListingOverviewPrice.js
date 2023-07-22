import React from "react";

import s from "./ListingOverviewPrice.module.scss";

import InfoBubble from "../../../components/InfoBubble/InfoBubble";
import ProductPrice from "../../../components/products/price/ProductPrice";
import DollarSignIcon from "../../../components/icons/price/DollarSignIcon";

export default function ListingOverviewPrice({
	title = "Question Fee",
	product,
	suffix,
}) {
	return (
		<div className={s.root}>
			<div className={s.sectionSubtitle}>
				{title}: &nbsp;
				{product.price > 0 ? (
					<InfoBubble tooltipText="This price doesn't include gas fees" />
				) : null}
			</div>

			<div className={s.priceRow}>
				<DollarSignIcon color="#1a1c21" />

				<ProductPrice
					price={product.price}
					token={product.token}
					minDecimals={2}
					suffix={suffix}
				/>
			</div>
		</div>
	);
}
