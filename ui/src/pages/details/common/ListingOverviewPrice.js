import React from "react";

import s from "./ListingOverviewPrice.module.scss";

import InfoBubble from "../../../components/InfoBubble/InfoBubble";
import ProductPrice from "../../../components/products/price/ProductPrice";
import DollarSignIcon from "../../../components/icons/price/DollarSignIcon";

export default function ListingOverviewPrice({ product }) {
	return (
		<div className={s.root}>
			<div className={s.sectionSubtitle}>
				License Fee: &nbsp;
				{product.price > 0 ? (
					<InfoBubble tooltipText="This price doesn't include gas fees" />
				) : null}
			</div>

			<div className={s.priceRow}>
				<DollarSignIcon color="#78909c" />

				<ProductPrice
					price={product.price}
					token={product.token}
					minDecimals={2}
					suffix="per article"
				/>
			</div>
		</div>
	);
}
