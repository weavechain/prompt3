import React from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

import cx from "classnames";

import s from "./BridgeHistory.module.scss";

import AppConfig from "../../../../../AppConfig";
import ImgSvg from "../../../../../assets/images/general/emptyVoid.svg";
import LineageIcon from "../../../../../components/icons/LineageIcon";
import InfoBubble from "../../../../../components/InfoBubble/InfoBubble";
import SectionTitleWidget from "../../../../../components/SectionTitleWidget/SectionTitleWidget";

export default function BridgeHistory({ account = {} }) {
	let totalEarned = account?.balance;
	const currency = AppConfig.CURRENCY;
	const hasBalances = !!account.balanceHistory;

	if (hasBalances) {
		account.balanceHistory.forEach((b) => {
			totalEarned += b.earned * 1;
		});
	}

	const data = account.balanceHistory || [];

	const CustomizedXTick = ({ x, y, payload }) => {
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={15} y={10} dy={2} textAnchor="end" fill="#78909C" fontSize={8}>
					{payload.value}
				</text>
			</g>
		);
	};

	const CustomizedYTick = ({ x, y, payload }) => {
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={0} y={0} textAnchor="end" fill="#78909C" fontSize={8}>
					{payload.value}
				</text>
			</g>
		);
	};

	return (
		<div className={s.root}>
			<SectionTitleWidget
				icon={<LineageIcon />}
				title="Balance History"
				rootClassName={s.sectionHeader}
			/>

			<div className={s.content}>
				{hasBalances ? (
					<div className={s.chartContainer}>
						<div className={s.titleContainer}>
							<div className={s.title}>Locked ({AppConfig.AppName})</div>
							<InfoBubble
								tooltipText={`This balance is managed in the ${AppConfig.AppName} and can be actively used for data operation payments.`}
							/>
						</div>

						<div className={s.chart}>
							<div className={s.legend}>{currency}</div>
							<ResponsiveContainer>
								<LineChart
									height={300}
									data={data}
									margin={{ top: 0, right: 0, bottom: 5, left: 0 }}
								>
									<Line
										type="monotone"
										dataKey="net"
										stroke="#50b0f9"
										dot={{ r: 2 }}
									/>
									<Tooltip />

									<CartesianGrid stroke="#ccc" strokeDasharray="1 5" />

									<XAxis
										dataKey="date"
										interval="preserveStart"
										tick={<CustomizedXTick />}
									/>
									<YAxis
										interval="preserveStart"
										tic
										dataKey="net"
										tick={<CustomizedYTick />}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				) : (
					<img src={ImgSvg} alt="Empty img" className={s.emptyImage} />
				)}

				<div className={s.earningsSummary}>
					<div className={s.earningsCell}>
						<span className={cx(s.amount, { [s.earned]: totalEarned > 0 })}>
							{(1 * totalEarned).toFixed(2)} {AppConfig.CURRENCY}
						</span>
						<div className={s.label}>Total Earned</div>
					</div>
				</div>
			</div>
		</div>
	);
}
