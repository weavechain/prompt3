import React from "react";
import DOMPurify from "dompurify";

import { capitalize } from "lodash";

import s from "./ListingOverview.module.scss";

import WeaveDetails from "../common/WeaveDetails";
import ListingOverviewPrice from "../common/ListingOverviewPrice";
import CopyTextWidget from "../../../components/CopyTextWidget/CopyTextWidget";
import InfoBubble from "../../../components/InfoBubble/InfoBubble";

import SubmitWidget from "./SubmitWidget";

export default function ListingOverview({ product = {} }) {
	const { weave } = product;

	const items = (product?.token || "").split(":");
	const blockchain = product.price !== 0 ? items[0] : null;

	return (
		<div className={s.root} id="overview">
			<div className={s.section}>
				{/* CONTENT */}
				<SubmitWidget product={product} />

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

						<p className={s.text}>
							{product.license_description}
						</p>
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
				{weave && <WeaveDetails weave={weave} product={product} />}
			</div>
		</div>
	);
}
