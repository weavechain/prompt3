import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import s from "./AskPromptPage.module.scss";

import AppHeader from "../../../components/AppHeader/AppHeader";

import RelatedListings from "../common/related/RelatedListings";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import TabsHelper from "../../../helpers/TabsHelper";
import ListingOverview from "./ListingOverview";

export default function AskPromptPage() {
	const { id } = useParams() || {};
	const { products = [] } = useSelector((state) => state.products || {});
	const { account = {} } = useSelector((state) => state.user || {});

	const product = products.find((p) => p.id === id);
	const relatedProducts = products.filter((p) => p.id !== id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	return product ? (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget
					tabs={TabsHelper.getTabs({ id, tab: "Ask Persona", account })}
				/>
			</AppHeader>

			<div className={s.content}>
				<ListingOverview product={product} />
				<RelatedListings products={relatedProducts} />
			</div>
		</div>
	) : null;
}
