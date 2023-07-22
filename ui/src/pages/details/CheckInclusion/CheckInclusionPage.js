import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import s from "./CheckInclusionPage.module.scss";

import TabsHelper from "../../../helpers/TabsHelper";
import AppHeader from "../../../components/AppHeader/AppHeader";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import CopyTextWidget from "../../../components/CopyTextWidget/CopyTextWidget";
import InfoBubble from "../../../components/InfoBubble/InfoBubble";
import VerifiedTextWidget from "../../../components/VerifiedTextWidget/VerifiedTextWidget";
import ContractIcon from "../../../components/icons/ContractIcon";
import InclusionSubmitWidget from "./InclusionSubmitWidget";
import { readLineage } from "../../../_redux/actions/content";
import AppConfig from "../../../AppConfig";

export default function CheckInclusionPage() {
	const { id } = useParams() || {};
	const { products = [] } = useSelector((state) => state.products || {});
	const { account = {} } = useSelector((state) => state.user || {});

	const product = products.find((p) => p.id === id);
	const table = product?.persona + "_prompts";

	const [tabs, setTabs] = useState([])

	useEffect(() => {
		TabsHelper.getTabs({ id, tab: "Check Inclusion", account }).then(res => {
			setTabs(res)
		})
	}, [])
	const dispatch = useDispatch();

	const [rootHash, setRootHash] = useState("")
	const [inputHash, setInputHash] = useState("")
	const [computeHash, setComputeHash] = useState("")
	const [outputHash, setOutputHash] = useState("")
	const [writesSignature, setWritesSignature] = useState("")

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	useEffect(() => {
		dispatch(readLineage(product?.persona)).then(response => {
			if (!response[0] || !response[0].lineage) {
				return;
			}
			try {
				const lineage = JSON.parse(response[0].lineage)
				setRootHash(lineage.rootHash)
				setInputHash(lineage.inputHash)
				setComputeHash(lineage.computeHash)
				setOutputHash(lineage.outputHash)
				setWritesSignature(lineage.writesSignature)
			} catch (e) {}
		})
	}, [])

	const smartContractUrl = AppConfig.chainExplorer + AppConfig.rootHashContracts[product?.persona];

	// ------------------------------------- METHODS -------------------------------------
	return product ? (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget
					tabs={tabs}
				/>
			</AppHeader>

			<div className={s.content}>
				<div className={s.section}>
					<InclusionSubmitWidget persona={product.persona} table={table} />
				</div>

				<div className={s.section}>
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

					{product.merkle_root_hash && (
						<>
							<div className={s.sectionSubtitle}>
								<span>Merkle Root Hash:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>
							<p className={s.text}>{rootHash} <span onClick={() => window.open(smartContractUrl, "_blank")}>
								<ContractIcon />
							</span></p>
						</>
					)}

					{product.input_prompt_hash && (
						<>
							<div className={s.sectionSubtitle}>
								<span>Input Prompts Hash:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>
							<div className={s.hash}>
								<p className={s.text}>{inputHash}</p>
								<span onClick={() => window.open(smartContractUrl, "_blank")}>
									<ContractIcon />
								</span>
							</div>
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
								<p className={s.text}>{computeHash}</p>
								<span onClick={() => window.open(smartContractUrl, "_blank")}>
									<ContractIcon />
								</span>
							</div>
						</>
					)}

					{product.super_prompt_hash && (
						<>
							<div className={s.sectionSubtitle}>
								<span>Super Prompt Hash:</span>
								<InfoBubble
									tooltipText={
										"Payments for this dataset require tokens on this blockchain."
									}
								/>
							</div>
							<div className={s.hash}>
								<p className={s.text}>{outputHash}</p>
								<span onClick={() => window.open(smartContractUrl, "_blank")}>
									<ContractIcon />
								</span>
							</div>
						</>
					)}

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
							<p className={s.text}>{writesSignature}</p>
						</>
					)}
				</div>

				<div className={s.placeholder}>&nbsp;</div>

				{/* <RelatedListings
					products={relatedProducts}
					title="Check Other Models"
				/> */}
			</div>
		</div>
	) : null;
}
