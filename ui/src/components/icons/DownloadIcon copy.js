import React from "react";

export default function DownloadIcon({
	color = "#78909c",
	width = 25,
	height = 24,
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10 14.6668V1.8335"
				stroke={color}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M4.5 9.8335L10 15.3335L15.5 9.8335"
				stroke={color}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M18.25 20.167H1.75"
				stroke={color}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
		</svg>
	);
}
