import React from "react";

export default function ClearIcon({
	color = "#1A1C21",
	width = 20,
	height = 20,
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_986_10140)">
				<g clipPath="url(#clip1_986_10140)">
					<path
						d="M13.5118 4.10744L9.58345 8.03581L5.65508 4.10744C5.39461 3.84698 5.04135 3.70065 4.67299 3.70065C4.30463 3.70065 3.95136 3.84698 3.6909 4.10744C3.43043 4.36791 3.2841 4.72118 3.2841 5.08954C3.2841 5.45789 3.43043 5.81116 3.6909 6.07163L7.61927 10L3.6909 13.9284C3.43043 14.1888 3.2841 14.5421 3.2841 14.9105C3.2841 15.2788 3.43043 15.6321 3.6909 15.8926C3.95136 16.153 4.30463 16.2994 4.67299 16.2994C5.04135 16.2994 5.39461 16.153 5.65508 15.8926L9.58345 11.9642L13.5118 15.8926C13.7723 16.153 14.1256 16.2994 14.4939 16.2994C14.8623 16.2994 15.2155 16.153 15.476 15.8926C15.7365 15.6321 15.8828 15.2788 15.8828 14.9105C15.8828 14.5421 15.7365 14.1888 15.476 13.9284L11.5476 10L15.476 6.07163C15.7365 5.81116 15.8828 5.45789 15.8828 5.08954C15.8828 4.72118 15.7365 4.36791 15.476 4.10744C15.2155 3.84698 14.8623 3.70065 14.4939 3.70065C14.1256 3.70065 13.7723 3.84698 13.5118 4.10744Z"
						fill={color}
					/>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_986_10140">
					<rect width="20" height="20" fill="white" />
				</clipPath>
				<clipPath id="clip1_986_10140">
					<rect
						width="16.6667"
						height="16.6667"
						fill="white"
						transform="translate(-2.20166 10) rotate(-45)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
}