import React from "react";

import { extractLogo } from "../../../helpers/Utils";
import s from "./WeaveDetails.module.scss";

import CopyTextWidget from "../../../components/CopyTextWidget/CopyTextWidget";
import LOCAL_STORAGE from "../../../helpers/localStorage";

export default function WeaveDetails({ product, weave = {} }) {
	const weaveDID = product
		? product.did?.split(":").splice(0, 3).join(":")
		: "";

	let stateData = LOCAL_STORAGE.loadState() || {};

	const weaveLogo = extractLogo(weave.logo, stateData.useMocks);

	return (
		<div className={s.root}>
			<div className={s.sectionSubtitle}>Weave Details</div>
			<div className={s.media}>
				<img src={weaveLogo} className={s.logo} alt={weave?.name} />

				<div className={s.mediaInfo}>
					<p className={s.title}>{weave?.name}</p>
					{weaveDID && (
						<CopyTextWidget
							title=""
							text={weaveDID}
							className={s.text}
							titleStyle={s.did}
							rootClassName={s.didContainer}
						/>
					)}

					{weave?.description !== weave?.name ? (
						<p className={s.label}>{weave?.description}</p>
					) : null}
				</div>
			</div>
		</div>
	);
}
