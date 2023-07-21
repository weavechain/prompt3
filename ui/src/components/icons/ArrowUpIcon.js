import React from "react";

export default function ArrowUpIcon({
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
				d="M11.5 18.8333V5.99994"
				stroke={fillColor}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M17 11.4999L11.5 5.99994L6 11.4999"
				stroke={fillColor}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
		</svg>
	);
}
