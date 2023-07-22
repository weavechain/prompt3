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
import RelatedListings from "../common/related/RelatedListings";
import TabsHelper from "../../../helpers/TabsHelper";
import ContractIcon from "../../../components/icons/ContractIcon";

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
							<div className={s.sectionSubtitle}>About Assistant:</div>
							<p
								className={s.text}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(product.description),
								}}
							/>
						</>
					)}

					{/* PRICE */}
					<ListingOverviewPrice
						product={product}
						title="License Fees"
						suffix="per generative usage training"
					/>

					{/* License Requirements */}
					{product.license_req && (
						<>
							<div className={s.sectionSubtitle}>
								<span>License Requirements:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>

							<p
								className={s.text}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(product.license_description),
								}}
							/>
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

					{product.super_prompt_creation_hash && (
						<>
							<div className={s.sectionSubtitle}>
								<span>Super Prompt Creation Hash:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>
							<div className={s.hash}>
								<p className={s.text}>{product.super_prompt_creation_hash}</p>
								<ContractIcon />
							</div>
						</>
					)}

					{product.super_hash && (
						<>
							<div className={s.sectionSubtitle}>
								<span>Super Prompt Creation Hash:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>
							<p className={s.text}>{product.super_hash}</p>
						</>
					)}
				</div>

				<RelatedListings products={relatedProducts} />
			</div>
		</div>
	) : null;
}
