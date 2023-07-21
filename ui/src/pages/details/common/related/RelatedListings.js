import React from "react";

import s from "./RelatedListings.module.scss";

import SectionTitleWidget from "../../../../components/SectionTitleWidget/SectionTitleWidget";
import ProductsList from "../../../../components/products/ProductsList";

export default function RelatedListings({
	products = [],
	title = "Submit to Other Models",
}) {
	return (
		<div className={s.root} id="related">
			<div className={s.section}>
				<SectionTitleWidget title={title} className={s.sectionTitle} />
				<ProductsList products={products} />
			</div>
		</div>
	);
}
