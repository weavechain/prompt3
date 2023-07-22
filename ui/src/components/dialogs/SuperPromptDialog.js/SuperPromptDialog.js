import React, { useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { downloadAsCsv, now } from "../../../helpers/Utils";

import s from "./SuperPromptDialog.module.scss";

import VerifiedTextWidget from "../../VerifiedTextWidget/VerifiedTextWidget";
import ContractIcon from "../../icons/ContractIcon";
import InfoBubble from "../../InfoBubble/InfoBubble";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import ShareIcon from "../../icons/ShareIcon";
import AppConfig from "../../../AppConfig";

export default function SuperPromptDialog({ persona, data = {}, close = () => {} }) {
	const validationDate = data.last_updated || now();

	const match = data.match;
	const tree = data.tree;
	const merkleRoot =
		data.rootHash || "B4JkWiUwoSHkpxehXzeXfUa8UDL2dMpFpMgyca72Tak9";
	const inputPromptHash =
		data.inputHash || "6LfKoQQMqb8fYgA1PwBPKMhFaJ59Fn3DWw6qTRri4zjN";
	const superPromptHash =
		data.superPromptHash || "36UaD8YjacqVUxbbCoAssrkruugmmAWjC7sQLvKEJcNC=";
	const superPromptCreationHash =
		data.superPromptCreationHash ||
		"4M5CUV9uRi6EE42YEKxYyPkd35Kf1CMfUWig1VUMfnWu==";
	const signatureHash =
		data.signatureHash ||
		"KW3AkT5yH3Rx6Y86xKmXXwq5XSNAaaqcXewxseQ4mVCam5WGpiepuT2HHMwydyUKyygswfhy6J5Vv6q8sfCAWch";

	const smartContractUrl = AppConfig.chainExplorer + AppConfig.rootHashContracts[persona];

	// ------------------------------------- METHODS -------------------------------------
	const downloadTree = () => {
		const columns = [];
		downloadAsCsv(tree, columns, "tree.txt");
	};

	return (
		<Modal centered isOpen={true} className={s.root} toggle={close} backdrop>
			<ModalHeader toggle={close}>
				<p className={s.title}>Super Prompt Verified Details</p>
			</ModalHeader>

			<ModalBody>
				<div className={s.section}>
					<div className={s.promptCard}>
						<div className={s.title}>Super Prompt</div>
						<div className={s.text}>
							You are a guide who knows Paris very well. When someone asks for
							the best place to do something, rewrite the prompt to list the top
							5 of whatever they are asking for. When user asks for anything
							about a place or places, give them the name, address, phone
							number, and opening hours.
						</div>
					</div>

					<div className={s.valueContainer}>
						<div className={s.sectionTitle}>
							<span>Merkle Root Hash:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<div className={s.hash}>
							<p className={s.text}>{merkleRoot}</p>
						</div>

						<VerifiedTextWidget
							text={
								match
									? "Merkle Leaf was validated to exist within Merkle Tree at " +
									  validationDate
									: "Merkle Leaf was validated Not to exist within Merkle Tree at " +
									  validationDate
							}
						/>
					</div>

					<div className={s.valueContainer}>
						<div className={s.sectionTitle}>
							<span>Input Prompts Hash:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<div className={s.hash}>
							<p className={s.text}>{inputPromptHash}</p>

						}<span onClick={() => window.open(smartContractUrl, "_blank")}>
							<ContractIcon />
						</span>
						</div>
					</div>

					<div className={s.valueContainer}>
						<div className={s.sectionTitle}>
							<span>Super Prompt Creation Hash:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<div className={s.hash}>
							<p className={s.text}>{superPromptCreationHash}</p>
							<span onClick={() => window.open(smartContractUrl, "_blank")}>
								<ContractIcon />
							</span>
						</div>
					</div>

					<div className={s.valueContainer}>
						<div className={s.sectionTitle}>
							<span>Super Prompt Hash:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<div className={s.hash}>
							<p className={s.text}>{superPromptHash}</p>
							<span onClick={() => window.open(smartContractUrl, "_blank")}>
								<ContractIcon />
							</span>
						</div>
					</div>

					<div className={s.valueContainer}>
						<div className={s.sectionTitle}>
							<span>Super Prompt Hash:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<div className={s.hash}>
							<p className={s.text}>{superPromptHash}</p>
							<span onClick={() => window.open(smartContractUrl, "_blank")}>
								<ContractIcon />
							</span>
						</div>
					</div>

					<div className={s.valueContainer}>
						<div className={s.sectionTitle}>
							<span>Signature of Super Prompt Creation:</span>
							<InfoBubble
								tooltipText={
									"Payments for this dataset require tokens on this blockchain."
								}
							/>
						</div>
						<div className={s.hash}>
							<p className={s.text}>{signatureHash}</p>
						</div>
					</div>
				</div>
			</ModalBody>

			<ModalFooter>
				<div className={s.buttons}>
					<Button color="primary" className="dark" onClick={downloadTree}>
						<i className="fa fa-download" />
						<span>Download Merkle Tree</span>
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
}
