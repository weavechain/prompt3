import React from "react";
import cx from "classnames";
import { Button } from "reactstrap";

import TreeImg from "../../../assets/images/general/merkle-tree.svg";
import FoundTreeImg from "../../../assets/images/general/found-tree.svg";
import s from "./InclusionResponse.module.scss";

import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import MerkleBlackIcon from "../../../components/icons/MerkleBlackIcon";
import CopyWidget from "../../../components/CopyWidget/CopyWidget";
import VerifiedTextWidget from "../../../components/VerifiedTextWidget/VerifiedTextWidget";
import DownloadIcon from "../../../components/icons/DownloadIcon";
import { downloadAsCsv, now } from "../../../helpers/Utils";
import HashIcon from "../../../components/icons/HashIcon";
import ShareIcon from "../../../components/icons/ShareIcon";
import AppConfig from "../../../AppConfig";

export default function InclusionResponse({ persona, response }) {
	/* const response = {
		hash: "Dym41dxkuXKGGv3CF56A5ef4DkZJ85ydcqW5LAE9tQv2",
		result: { match: false, rootHash: "", tree: "" },
		match: false,
		rootHash: "",
		tree: "",
	}; */

	const validationDate = response?.last_updated || now();
	// ------------------------------------- METHODS -------------------------------------
	const downloadTree = () => {
		if (response.tree) {
			const columns = [];
			downloadAsCsv(response.tree, columns, "tree.txt");
		}
	};

	const smartContractUrl = AppConfig.chainExplorer + AppConfig.rootHashContracts[persona];

	return !response ? (
		<div className={s.root}>
			<SectionTitleWidget
				className={s.sectionTitle}
				title="Check Merkle Tree for Prompt Matches"
				icon={<MerkleBlackIcon />}
			/>

			<div className={cx(s.inputContainer, s.merkle)}>
				<img src={TreeImg} alt=".." />
			</div>
		</div>
	) : response.match ? (
		/* FOUND */
		<div className={s.root}>
			<SectionTitleWidget
				className={s.sectionTitle}
				title="Verified to Exist in Merkle Tree"
				icon={<MerkleBlackIcon />}
			/>

			<div className={cx(s.inputContainer, s.match)}>
				<CopyWidget
					text={response.hash}
					inputStyle={s.sectionInput}
					title={
						<SectionTitleWidget
							className={s.sectionTitle}
							title="Content Hash"
						/>
					}
				/>

				<CopyWidget
					text={response.hash}
					inputStyle={s.sectionInput}
					title={
						<SectionTitleWidget
							className={s.sectionTitle}
							title="Smart Contract"
						/>
					}
				/>

				<VerifiedTextWidget
					text={
						"Merkle Leaf was validated to exist within Merkle Tree at " +
						validationDate
					}
				/>

				<img src={FoundTreeImg} alt=".." />

				<div className={s.buttons}>
					<Button
						className={cx(s.button, "btn-border")}
						color="primary"
						onClick={downloadTree}
						disabled={!response.tree}
					>
						<DownloadIcon color="#50b0f9" width={16} height={16} />
						<span>Download Merkle Tree</span>
					</Button>
				</div>
			</div>
		</div>
	) : (
		<div className={s.root}>
			<SectionTitleWidget
				className={s.sectionTitle}
				title="No Matches Found in Merkle Tree"
				icon={<MerkleBlackIcon />}
			/>

			<div className={cx(s.inputContainer, s.match)}>
				<CopyWidget
					text={response.hash}
					inputStyle={s.sectionInput}
					title={
						<SectionTitleWidget
							className={s.sectionTitle}
							title="Content Hash"
						/>
					}
				/>

				<VerifiedTextWidget
					text={
						"Merkle Leaf was validated to " + (response.result?.match ? "" : "NOT ") + "exist within Merkle Tree at " +
						validationDate
					}
				/>

				<img src={FoundTreeImg} alt=".." />

				<div className={s.buttons}>
					{response.tree ? (
						<Button
							className={cx(s.button, "btn-border")}
							color="primary"
							onClick={downloadTree}
						>
							<DownloadIcon color="#50b0f9" width={16} height={16} />
							<span>Download Merkle Tree</span>
						</Button>
					) : null}
				</div>
			</div>
		</div>
	);
}
