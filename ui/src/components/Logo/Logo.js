import React from "react";
import { Link } from "react-router-dom";

import s from "./Logo.module.scss";
import LogoImg from "../../assets/images/app-logo-text.png";

export default function Logo() {
	const mainUrl = "/";

	return (
		<Link to={mainUrl} className={s.root}>
			<div className={s.logo}>
				<img src={LogoImg} alt="..." className={s.logo} />
			</div>
		</Link>
	);
}
