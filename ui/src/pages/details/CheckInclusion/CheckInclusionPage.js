import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

import s from "./CheckInclusionPage.module.scss";
import { checkInclusionWithMerkle } from "../../../_redux/actions/content";

import TabsHelper from "../../../helpers/TabsHelper";
import AppHeader from "../../../components/AppHeader/AppHeader";
import MerkleLeafDialog from "../../../components/dialogs/MerkleLeafDialog/MerkleLeafDialog";
import TabsWidget from "../../../components/TabsWidget/TabsWidget";
import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import TitleIcon from "../../../components/icons/TitleIcon";
import CopyTextWidget from "../../../components/CopyTextWidget/CopyTextWidget";
import RelatedListings from "../common/related/RelatedListings";

export default function CheckInclusionPage() {
	const [hash, setHash] = useState("");
	const [rootHash, setRootHash] = useState("");
	const [match, setMatch] = useState(false);
	const [text, setText] = useState("");
	const [tree, setTree] = useState("");
	const [showMerkleDialog, setShowMerkleDialog] = useState(false);

	const { id } = useParams() || {};
	const { products = [] } = useSelector((state) => state.products || {});
	const { account = {} } = useSelector((state) => state.user || {});

	const product = products.find((p) => p.id === id);
	const relatedProducts = products.filter((p) => p.id !== id);

	const table = product?.persona + "_prompts";

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	// ------------------------------------- METHODS -------------------------------------

	return product ? (
		<div className={s.root}>
			<AppHeader title={product.title}>
				<TabsWidget tabs={TabsHelper.getTabs({ id, tab: "Check Inclusion", account })} />
			</AppHeader>

			{showMerkleDialog ? (
				<MerkleLeafDialog
					persona={product?.persona}
					data={{ hash, rootHash, match, tree }}
					close={() => setShowMerkleDialog(false)}
				/>
			) : null}

			<div className={s.content}>
				<div className={s.section}>
					<SectionTitleWidget
						className={s.sectionTitle}
						title="Content"
						isMandatory
						icon={<TitleIcon />}
					/>

					<div className={s.inputContainer}>
						<textarea
							name="text"
							defaultValue=""
							rows={10}
							placeholder="Paste text here"
							onChange={(e) => setText(e.target.value)}
						/>

						{/* MARKDOWN */}
						<div className={s.textAreaInfo}>
							<p className={s.markdown}>
								Paste content to submit for licensing.{" "}
								<span>**Markdown accepted.**</span>
							</p>
						</div>

						<div className={s.buttons}>
							<Button
								className={s.button}
								color="primary"
								onClick={() => {
									console.log(text);
									console.log(table);
									checkInclusionWithMerkle(table, text).then((result) => {
										console.log(result);
										setHash(result?.hash);
										setRootHash(result?.result?.rootHash);
										setMatch(result?.result?.match);
										setTree(result?.result?.tree);
										setShowMerkleDialog(true);
									});
								}}
								disabled={!text}
							>
								Check for Usage
							</Button>
						</div>
					</div>
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
							<div className={s.sectionSubtitle}>About {product.title}:</div>
							<p
								className={s.text}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(product.description),
								}}
							/>
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
				</div>

				<RelatedListings
					products={relatedProducts}
					title="Check Other Models"
				/>
			</div>
		</div>
	) : null;
}
