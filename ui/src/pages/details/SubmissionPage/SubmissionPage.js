import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { capitalize } from "lodash";
import DOMPurify from "dompurify";

import s from "./SubmissionPage.module.scss";

import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import CopyTextWidget from "../../../components/CopyTextWidget/CopyTextWidget";
import InfoBubble from "../../../components/InfoBubble/InfoBubble";

import ReviewSubmitWidget from "./SubmissionWidget";
import ListingOverviewPrice from "../common/ListingOverviewPrice";
import WeaveDetails from "../common/WeaveDetails";
import RelatedListings from "../common/related/RelatedListings";
import TabsHelper from "../../../helpers/TabsHelper";

export default function SubmissionPage() {
	const { id } = useParams() || {};
	const { products = [] } = useSelector((state) => state.products || {});
	const { account = {} } = useSelector((state) => state.user || {});

	const product = products.find((p) => p.id === id) || {};
	const relatedProducts = products.filter((p) => p.id !== id);

	const items = (product?.token || "").split(":");
	const blockchain = product.price !== 0 ? items[0] : null;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	return product ? (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget
					tabs={TabsHelper.getTabs({ id, tab: "Submit Prompts", account })}
				/>
			</AppHeader>

			<div className={s.content}>
				<div className={s.section}>
					<ReviewSubmitWidget product={product} />

					{/* PROVIDER */}
					{product.author && (
						<div id="provider">
							<div className={s.sectionSubtitle}>Provided by:</div>
							<CopyTextWidget text={product.author} className={s.text} />
						</div>
					)}

					{/* DESC */}
					{product.description && (
						<>
							<div className={s.sectionSubtitle}>About {product.title}:</div>
							<p
								className={s.text}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(product.description),
								}}
							/>
						</>
					)}

					{/* PRICE */}
					<ListingOverviewPrice product={product} />

					{/* License Requirements */}
					{product.license_req && (
						<>
							<div className={s.sectionSubtitle}>License Requirements:</div>
							<p className={s.text}>{`>${product.license_req} Words`}</p>

							<p className={s.text}>{product.license_description}</p>
						</>
					)}

					{/* BLOCKCHAIN */}
					{blockchain && (
						<>
							<div className={s.sectionSubtitle}>
								<span>Blockchain Network for Payments:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>
							<p className={s.text}>{capitalize(blockchain)}</p>
						</>
					)}

					{/* DATABASE DID */}
					{product.did && (
						<CopyTextWidget
							title="DID:"
							text={product.did}
							titleStyle={s.sectionSubtitle}
							className={s.did}
						/>
					)}

					{/* WEAVE */}
					{product.weave && (
						<WeaveDetails weave={product.weave} product={product} />
					)}
				</div>

				<RelatedListings products={relatedProducts} />
			</div>
		</div>
	) : null;
}
