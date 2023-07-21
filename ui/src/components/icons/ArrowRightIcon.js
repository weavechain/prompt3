import React from "react";

export default function ArrowRightIcon({ color = "#DC3545", width = 24, height = 24 }) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.16667 11.5L18 11.5"
				stroke={color}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M12.5 17L18 11.5L12.5 6"
				stroke={color}
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
		</svg>
	);
}
