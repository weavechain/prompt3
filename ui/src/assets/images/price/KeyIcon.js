import React from "react";

export default function KeyIcon({
	color = "#d9dbe1",
	width = 16,
	height = 16,
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19.05 0L9.75 9.45C9 9.15 8.25 9 7.5 9C3.3 9 0 12.3 0 16.5C0 20.7 3.3 24 7.5 24C11.7 24 15 20.7 15 16.5C15 15.75 14.85 14.85 14.55 14.1L16.5 12V9H19.5V6H22.5L24 4.5V0H19.05ZM6.75 18C5.55 18 4.5 16.95 4.5 15.75C4.5 14.55 5.55 13.5 6.75 13.5C7.95 13.5 9 14.55 9 15.75C9 16.95 7.95 18 6.75 18Z"
				fill={color}
			/>
		</svg>
	);
}
