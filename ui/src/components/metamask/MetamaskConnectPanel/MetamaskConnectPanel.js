import React from "react";

import AppConfig from "../../../AppConfig";

import s from "./MetamaskConnectPanel.module.scss";

import ArrowRightIcon from "../../icons/ArrowRightIcon";
import FoxIcon from "../../icons/FoxIcon";

export default function MetamaskConnectPanel({ onLogin }) {
	return (
		<div className={s.root}>
			<div className={s.foxContainer} onClick={onLogin}>
				<FoxIcon />
				<div className={s.foxRighPanel}>
					<p className={s.meta}>Metamask</p>
					<p className={s.subTitle}>Connect using Metamask</p>
				</div>

				<ArrowRightIcon color="var(--lsp-blue)" />
			</div>

			<div className={s.download}>
				<p>
					Don't have a wallet?{" "}
					<a
						href={AppConfig.METAMASK_DOWNLOAD_URL}
						target="_blank"
						rel="noreferrer"
					>
						{" "}
						Download here
					</a>
				</p>
			</div>
		</div>
	);
}
