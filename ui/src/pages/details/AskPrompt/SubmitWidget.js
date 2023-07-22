import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { generateContent } from "../../../_redux/actions/content";

import s from "./SubmitWidget.module.scss";

import BrainImg from "../../../assets/images/general/ai-brain.svg";

import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import TitleIcon from "../../../components/icons/TitleIcon";
import ResponseIcon from "../../../components/icons/ResponseIcon";
import ResponseHashDialog from "../../../components/dialogs/ResponseHashDialog/ResponseHashDialog";

export default function SubmitWidget({ product }) {
	const persona = product?.title;

	const dispatch = useDispatch();
	const [text, setText] = useState("");
	//const [table] = useState(AppConfig.DEFAULT_TABLE); //TODO: different tables for different advertised sets
	const [isGenerating, setIsGenerating] = useState(false);
	const [reponseText, setReponseText] = useState("");
	const [showResponseDialog, setShowResponseDialog] = useState(false);

	// ------------------------------------- METHODS -------------------------------------
	const onSubmit = () => {
		setIsGenerating(true);

		try {
			dispatch(generateContent(product?.persona, text)).then((result) => {
				setIsGenerating(false);
				console.log(result)
				if (result?.output) {
					setReponseText(result?.output);
					toast.success("Answered");
				} else {
					toast.error("Problem while generating response");
				}
			});
		} catch (error) {}
	};

	const showResponseDetails = () => {
		setShowResponseDialog(true);
	};

	return (
		<div className={s.root}>
			{showResponseDialog ? (
				<ResponseHashDialog close={() => setShowResponseDialog(false)} />
			) : null}

			<div className={s.content}>
				<Row>
					<Col lg="6" sm="12">
						<SectionTitleWidget
							className={s.sectionTitle}
							title="Ask Question"
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

							<div className={s.buttons}>
								<Button
									className={s.button}
									color="primary"
									onClick={onSubmit}
									disabled={!text}
								>
									Ask {persona}
								</Button>
							</div>
						</div>
					</Col>

					<Col lg="6" sm="12">
						<SectionTitleWidget
							className={s.sectionTitle}
							title="Generated Response"
							isMandatory
							icon={<ResponseIcon />}
						/>

						<div className={s.inputContainer}>
							{isGenerating ? (
								<div className={s.generating}>
									<img src={BrainImg} alt=".." />
								</div>
							) : null}

							<textarea
								className={s.response}
								disabled
								name="text"
								value={reponseText || ""}
								rows={10}
								placeholder={
									isGenerating
										? persona + " is generating your response, please wait..."
										: "After you submit a question, the assistant will generate a response here."
								}
								onChange={(e) => setText(e.target.value)}
							/>

							<div className={s.buttons}>
								{reponseText ? (
									<Button
										className={s.button}
										color="primary"
										onClick={showResponseDetails}
										disabled={!reponseText}
									>
										View Verified Response Details
									</Button>
								) : null}
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
}
