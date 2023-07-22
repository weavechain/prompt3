import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cx from "classnames";
import { downloadAsCsv } from "../../../helpers/Utils";
import s from "./MerkleLeafDialog.module.scss";

import AppConfig from "../../../AppConfig";
import SectionTitleWidget from "../../SectionTitleWidget/SectionTitleWidget";
import VerifiedTextWidget from "../../VerifiedTextWidget/VerifiedTextWidget";
import CopyWidget from "../../../components/CopyWidget/CopyWidget";
import MerkleBlackIcon from "../../../components/icons/MerkleBlackIcon";
import HashIcon from "../../../components/icons/HashIcon";
import ShareIcon from "../../../components/icons/ShareIcon";

export default function MerkleLeafDialog({ persona = "", data = {}, close = () => {} }) {
	var date = new Date();
	var now =
		("00" + (date.getMonth() + 1)).slice(-2)
		+ "/" + ("00" + date.getDate()).slice(-2)
		+ "/" + date.getFullYear() + " "
		+ ("00" + date.getHours()).slice(-2) + ":"
		+ ("00" + date.getMinutes()).slice(-2)
		+ ":" + ("00" + date.getSeconds()).slice(-2);
	const validationDate = data.last_updated || now;

	const match = data.match;
	const tree = data.tree;
	const contentHash = data.hash;
	const merkleRoot = data.rootHash;
	const smartContractUrl = AppConfig.chainExplorer + AppConfig.rootHashContracts[persona];

	// ------------------------------------- METHODS -------------------------------------
	const downloadTree = () => {
		const columns = [];
		downloadAsCsv(
			tree,
			columns,
			"tree.txt"
		);
	};

	return (
		<Modal centered isOpen={true} className={s.root} toggle={close} backdrop>
			<ModalHeader toggle={close}>
				<p className={s.title}>{ match ? "Verified to Exist in Merkle Tree" : "Verified Not to Exist in Merkle Tree"}</p>
			</ModalHeader>

			<ModalBody>
				<div className={s.section}>
					<CopyWidget
						text={contentHash}
						inputStyle={s.sectionInput}
						title={
							<SectionTitleWidget
								rootClassName={s.sectionTitle}
								title="Content Hash"
								icon={<HashIcon />}
							/>
						}
					/>
				</div>

				<div className={s.section}>
					<CopyWidget
						text={merkleRoot}
						inputStyle={s.sectionInput}
						title={
							<div className={s.verified}>
								<SectionTitleWidget
									rootClassName={s.sectionTitle}
									title="Merkle Root"
									icon={<MerkleBlackIcon />}
								/>

								<VerifiedTextWidget
									text={match ? "Merkle Leaf was validated to exist within Merkle Tree at " + validationDate : "Merkle Leaf was validated Not to exist within Merkle Tree at " + validationDate}
								/>
							</div>
						}
					/>
				</div>

				<div className={s.section}>
					<CopyWidget
						text={smartContractUrl}
						inputStyle={cx(s.sectionInput, s.contract)}
						title={
							<SectionTitleWidget
								rootClassName={s.sectionTitle}
								title="Smart Contract"
								icon={<HashIcon />}
							/>
						}
						customIcon={
							<div onClick={() => window.open(smartContractUrl, "_blank")}>
								<ShareIcon width={25} height={25} />
							</div>
						}
					/>
				</div>
			</ModalBody>

			<ModalFooter>
				<div className={s.buttons}>
					<Button color="primary" className="btn-border" onClick={close}>
						Close
					</Button>
					<Button color="primary" className="dark" onClick={downloadTree}>
						<i className="fa fa-download" />
						<span>Download Merkle Tree</span>
					</Button>
				</div>

				<div className={s.issueText}>Issue Takedown Request</div>
			</ModalFooter>
		</Modal>
	);
}
