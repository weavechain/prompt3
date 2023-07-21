import React from "react";

export default function KeyIcon({
	color = "#289EF8",
	width = 40,
	height = 40,
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
				<g clipPath="url(#clip0_5_2206)">
					<path
						d="M24.5006 10.8335L17.639 17.6952C17.1682 17.5718 16.6765 17.5002 16.1673 17.5002C12.9457 17.5002 10.334 20.1118 10.334 23.3335C10.334 26.5552 12.9457 29.1668 16.1673 29.1668C19.389 29.1668 22.0006 26.5552 22.0006 23.3335C22.0006 22.591 21.8565 21.8835 21.604 21.2302L23.6673 19.1668V16.6668H26.1673L28.6673 14.1668V10.8335H24.5006Z"
						stroke={color}
						strokeWidth="2"
						strokeMiterlimit="10"
						strokeLinecap="square"
					/>
					<path
						d="M16.1676 25.0001C17.0881 25.0001 17.8343 24.2539 17.8343 23.3334C17.8343 22.4129 17.0881 21.6667 16.1676 21.6667C15.2472 21.6667 14.501 22.4129 14.501 23.3334C14.501 24.2539 15.2472 25.0001 16.1676 25.0001Z"
						stroke={color}
						strokeWidth="2"
						strokeMiterlimit="10"
						strokeLinecap="square"
					/>
				</g>
				<defs>
					<clipPath id="clip0_5_2206">
						<rect
							width="20"
							height="20"
							fill="white"
							transform="translate(9.5 10)"
						/>
					</clipPath>
				</defs>
		</svg>
	);
}
