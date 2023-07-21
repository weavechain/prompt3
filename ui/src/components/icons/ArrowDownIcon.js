import React from "react";

export default function ArrowDownIcon({
	color = "#50B0F9",
	width = 24,
	height = 24,
	disabled = false,
}) {
	const fillColor = disabled ? "#a3a4a6" : color;

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.5 17.8333V4.99994"
				stroke={fillColor}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M6 12.9999L11.5 18.4999L17 12.9999"
				stroke={fillColor}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
		</svg>
	);
}
