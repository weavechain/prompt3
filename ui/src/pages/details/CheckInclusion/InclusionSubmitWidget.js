import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import cx from "classnames";

import { checkInclusionWithMerkle } from "../../../_redux/actions/content";

import TreeImg from "../../../assets/images/general/merkle-tree.svg";
import s from "./InclusionSubmitWidget.module.scss";

import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import DigitalIcon from "../../../components/icons/DigitalIcon";
import MerkleBlackIcon from "../../../components/icons/MerkleBlackIcon";
import InclusionResponse from "./InclusionResponse";

export default function InclusionSubmitWidget({ table }) {
	const [text, setText] = useState("");
	const [hash, setHash] = useState("");
	const [rootHash, setRootHash] = useState("");
	const [match, setMatch] = useState(false);
	const [tree, setTree] = useState("");
	const [showMerkleDialog, setShowMerkleDialog] = useState(false);

	const [response, setResponse] = useState(null);

	// ------------------------------------- METHODS -------------------------------------

	const onCheckInclusion = () => {
		//console.log(text);
		//console.log(table);

		checkInclusionWithMerkle(table, text).then((result) => {
			console.debug(result);
			setResponse(result);

			setHash(result?.hash);
			setRootHash(result?.result?.rootHash);
			setMatch(result?.result?.match);
			setTree(result?.result?.tree);
			setShowMerkleDialog(true);
		});
	};

	return (
		<div className={s.root}>
			<div className={s.content}>
				<Row>
					<Col lg="6" sm="12">
						<SectionTitleWidget
							className={s.sectionTitle}
							title="Prompt"
							isMandatory
							icon={<DigitalIcon />}
						/>

						<div className={s.inputContainer}>
							<textarea
								name="text"
								defaultValue=""
								rows={10}
								placeholder="Type or paste the prompt you want to check here"
								onChange={(e) => setText(e.target.value)}
							/>

							<div className={s.buttons}>
								<Button
									className={s.button}
									color="primary"
									onClick={() => onCheckInclusion(text)}
									disabled={!text}
								>
									Check for Usage
								</Button>
							</div>
						</div>
					</Col>

					<Col lg="6" sm="12">
						<InclusionResponse response={response} />
					</Col>
				</Row>
			</div>
		</div>
	);
}
