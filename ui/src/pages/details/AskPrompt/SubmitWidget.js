import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import AppConfig from "../../../AppConfig";
import { generateContent } from "../../../_redux/actions/content";

import s from "./SubmitWidget.module.scss";

import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import TitleIcon from "../../../components/icons/TitleIcon";

export default function SubmitWidget({ product }) {
	const persona = product?.title;

	const dispatch = useDispatch();
	const history = useHistory();

	const [text, setText] = useState("");

	// ------------------------------------- METHODS -------------------------------------
	const onSubmit = () => {
		try {
			dispatch(generateContent(product?.persona, text)).then((result) => {
				if (result === "success") {
					toast.success("Answered");
				} else {
					toast.error("Problem while generating response");
				}
			});
		} catch (error) {}
	};

	return (
		<div className={s.root}>
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
							icon={<TitleIcon />}
						/>

						<div className={s.inputContainer}>
							<textarea
								className={s.response}
								disabled
								name="text"
								defaultValue=""
								rows={13}
								placeholder="{persona} is generating your response, please wait..."
								onChange={(e) => setText(e.target.value)}
							/>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
}
