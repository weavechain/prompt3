import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import s from "./ResponseHashDialog.module.scss";

import SectionTitleWidget from "../../SectionTitleWidget/SectionTitleWidget";
import CopyWidget from "../../CopyWidget/CopyWidget";
import HashIcon from "../../../components/icons/HashIcon";
import ContractIcon from "../../../components/icons/ContractIcon";
import ResponseIcon from "../../../components/icons/ResponseIcon";
import LockIcon from "../../../components/icons/LockIcon";

export default function ResponseHashDialog({ data = {}, close = () => {} }) {
	const {
		reponseHash = "36UaD8YjacqVUxbbCoAssrkruugmmAWjC7sQLvKEJcNC",
		questionHash = "6LfKoQQMqb8fYgA1PwBPKMhFaJ59Fn3DWw6qTRri4zjN",
		computeHash = "4M5CUV9uRi6EE42YEKxYyPkd35Kf1CMfUWig1VUMfnWu",
		signature = "KW3AkT5yH3Rx6Y86xKmXXwq5XSNAaaqcXewxseQ4mVCam5WGpiepuT2HHMwydyUKyy...",
	} = data;

	return (
		<Modal centered isOpen={true} className={s.root} toggle={close} backdrop>
			<ModalHeader toggle={close}>
				<p className={s.title}>Verified Response Details</p>
			</ModalHeader>

			<ModalBody>
				<div className={s.section}>
					{/* REPONSE */}
					<CopyWidget
						text={reponseHash}
						inputStyle={s.sectionInput}
						title={
							<SectionTitleWidget
								rootClassName={s.sectionTitle}
								title="Response Hash"
								icon={<HashIcon />}
								suffix={<ContractIcon />}
							/>
						}
					/>

					{/* QUESTION */}
					<CopyWidget
						text={questionHash}
						inputStyle={s.sectionInput}
						title={
							<SectionTitleWidget
								rootClassName={s.sectionTitle}
								title="Question Hash"
								icon={<HashIcon />}
								suffix={<ContractIcon />}
							/>
						}
					/>

					{/* COMPUTE HASH */}
					<CopyWidget
						text={computeHash}
						inputStyle={s.sectionInput}
						title={
							<SectionTitleWidget
								rootClassName={s.sectionTitle}
								title="Response Compute Hash"
								icon={<ResponseIcon />}
							/>
						}
					/>

					{/* SIGNATURE */}
					<CopyWidget
						text={signature}
						inputStyle={s.sectionInput}
						title={
							<SectionTitleWidget
								rootClassName={s.sectionTitle}
								title="Signature"
								icon={<LockIcon />}
							/>
						}
					/>
				</div>
			</ModalBody>

			<ModalFooter>
				<div className={s.buttons}>
					<Button color="primary" className="dark" onClick={close}>
						Close
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
}
