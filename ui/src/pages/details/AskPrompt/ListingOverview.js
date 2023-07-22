import React from "react";
import DOMPurify from "dompurify";

import s from "./ListingOverview.module.scss";

import ListingOverviewPrice from "../common/ListingOverviewPrice";
import CopyTextWidget from "../../../components/CopyTextWidget/CopyTextWidget";
import InfoBubble from "../../../components/InfoBubble/InfoBubble";

import SubmitWidget from "./SubmitWidget";

export default function ListingOverview({ product = {} }) {
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

				{product.signature_hash && (
					<>
						<div className={s.sectionSubtitle}>
							<span>Signature of Super Prompt Creation:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<p className={s.text}>{product.signature_hash}</p>
					</>
				)}
			</div>
		</div>
	);
}
