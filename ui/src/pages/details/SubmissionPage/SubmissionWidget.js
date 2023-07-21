import React, { useState } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

//import { wordsCount } from "../../../helpers/Utils";
import AppConfig from "../../../AppConfig";
import { writeContent } from "../../../_redux/actions/content";

import s from "./SubmissionWidget.module.scss";

import CheckboxWidget from "../../../components/CheckboxWidget/CheckboxWidget";
import SectionTitleWidget from "../../../components/SectionTitleWidget/SectionTitleWidget";
import TitleIcon from "../../../components/icons/TitleIcon";

export default function SubmissionWidget({ product }) {
	const [table] = useState(""); //TODO: use persona

	const dispatch = useDispatch();
	const history = useHistory();

	const [title] = useState("");
	const [text, setText] = useState("");
	const [hasAgreed, setHasAgreed] = useState(false);

	//const minWords = product.license_req;
	//const hasEnoughWords = wordsCount(text) >= product.license_req;

	// ------------------------------------- METHODS -------------------------------------
	const onSubmit = () => {
		// TODO: remove after API is fixed
		history.push("/account/submissions");

		try {
			dispatch(writeContent(table, text, title)).then((result) => {
				if (result === "success") {
					toast.success("Content submitted successfully");
					history.push("/account/submissions");
				} else {
					toast.error("Problem while submitting content");
				}
			});
		} catch (error) {}
	};

	const isValid = () => {
		return hasAgreed && text;
	};

	return (
		<div className={s.root}>
			<SectionTitleWidget
				className={s.sectionTitle}
				title="Prompt"
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

					{/* {hasEnoughWords ? null : (
						<span className={s.charsCount}>
							Enter at least {minWords} words to submit content
						</span>
					)} */}
				</div>

				{/* AGREEMENT */}
				<div className={s.terms} onClick={() => setHasAgreed(!hasAgreed)}>
					<CheckboxWidget
						checked={hasAgreed}
						onChange={() => setHasAgreed(!hasAgreed)}
					/>
					<div className={s.text}>
						I've read the{" "}
						<a href={AppConfig.TERMS_URL} target="_blank" rel="noreferrer">
							Terms of Service
						</a>{" "}
						and attest that the content submitted is my own material.
					</div>
				</div>

				<div className={s.buttons}>
					<Button
						className={s.button}
						color="primary"
						onClick={onSubmit}
						disabled={!isValid()}
					>
						Submit Prompt
					</Button>
				</div>
			</div>
		</div>
	);
}