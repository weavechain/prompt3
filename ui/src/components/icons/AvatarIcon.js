import React from "react";

export default function AvatarIcon({
	color = "#50B0F9",
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
			<g clipPath="url(#clip0_108_1493)">
				<g clipPath="url(#clip1_108_1493)">
					<path
						d="M10 10.8333C12.7575 10.8333 15 8.59083 15 5.83333V5C15 2.2425 12.7575 0 10 0C7.2425 0 5 2.2425 5 5V5.83333C5 8.59083 7.2425 10.8333 10 10.8333Z"
						fill={color}
					/>
					<path
						d="M16.1013 13.3175C12.1813 12.2317 7.81884 12.2317 3.89801 13.3175C2.09384 13.8175 0.833008 15.47 0.833008 17.3375V20H19.1663V17.3375C19.1663 15.47 17.9055 13.8175 16.1013 13.3175Z"
						fill={color}
					/>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_108_1493">
					<rect width="20" height="20" fill="white" />
				</clipPath>
				<clipPath id="clip1_108_1493">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
