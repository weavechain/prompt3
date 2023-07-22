import React from "react";
import cx from "classnames";
import { Button } from "reactstrap";
import { useMetaMask } from "metamask-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { formatAmount } from "../../helpers/Utils";
import s from "./AppHeader.module.scss";

import Logo from "../Logo/Logo";
import FoxIcon from "../icons/FoxIcon";
import AvatarIcon from "../../components/icons/AvatarIcon";
import AppConfig from "../../AppConfig";

export default function AppHeader({
	title,
	goBack,
	className = "",
	children,
	//onAvatarClick,
}) {
	const history = useHistory();
	const { connect } = useMetaMask();

	const balance = useSelector((state) => state.user?.account?.balance);

	// ------------------------------------- METHODS -------------------------------------
	const viewAccount = () => {
		//if (onAvatarClick) return onAvatarClick();
		history.push("/account");
	};

	const connectToMetamask = () => {
		connect().then(() => {
			history.push("/");
		});
	};

	return (
		<div className={cx(s.root, className)}>
			{goBack ? (
				<Button
					className={cx(s.backButton, "btn-border")}
					color="info"
					onClick={goBack}
				>
					<i className="fa fa-arrow-left" />
					<span>Back</span>
				</Button>
			) : null}

			<div className={s.title}>
				<Logo />
			</div>

			{/* TABS */}
			<div className={s.heading}>
				{title ? <div className={s.title}>{title}</div> : null}
				{children ? <>{children}</> : null}
			</div>

			{/* ICONS */}
			<div className={s.avatarContainer}>
				<div className={s.icons}>
					<div className={s.icon} onClick={connectToMetamask}>
						<FoxIcon />
					</div>
					<div className={s.icon}>
						<AvatarIcon />
					</div>
				</div>

				<div className={s.balance} onClick={viewAccount}>
					{`$${formatAmount(balance, 2, false, 2)}`}
					<span>{AppConfig.CURRENCY}</span>
				</div>
			</div>
		</div>
	);
}
