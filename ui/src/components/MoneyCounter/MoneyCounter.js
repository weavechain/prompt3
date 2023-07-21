import React, { useEffect, useRef, useState } from "react";
import { formatAmount } from "../../helpers/Utils";

import s from "./MoneyCounter.module.scss";
import SubmitionStatus from "../../helpers/models/SubmitionStatus";
import CoinsImg from "../../assets/images/general/coins.gif";

//import AppConfig from "../../AppConfig";

export default function MoneyCounter({ data }) {
	const { earnings = 0 } = data;

	const [showAnimation] = useState(data.status === SubmitionStatus.accepted);
	const money = parseFloat(Math.max(earnings, 0));

	const unloadRef = useRef(false);

	// Hide coin animation after 5000 ms
	/* useEffect(() => {
		setTimeout(() => {
			setShowAnimation(false);
			showAnimationRef.current = false;
		}, STEPS * 1000);

		return () => {
			clearInterval(intervalRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); */

	// COUNTER
	/* useEffect(() => {
		if (status === SubmitionStatus.accepted) {
			intervalRef.current = setInterval(() => {
				if (showAnimationRef.current) {
					setMoney((t) => +t + 1);
				}
			}, 1000);
		} else {
			clearInterval(intervalRef.current);
		}

		return () => {
			clearInterval(intervalRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [earnings, status]); */

	useEffect(() => {
		return () => {
			unloadRef.current = true;
		};
	}, []);

	return (
		<div className={s.root}>
			{earnings > 0 ? (
				<>
					{showAnimation ? <img src={CoinsImg} alt="..." /> : null}
					<p className={s.amount}>{formatAmount(money)}</p>
				</>
			) : (
				<p className={s.noEarnings}>-</p>
			)}
		</div>
	);
}
