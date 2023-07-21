import React from "react";

export default function PencilIcon({
	color = "#78909C",
	width = 23,
	height = 23,
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 23 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 20.0001L2 21.0001L3 15.0001L16.414 1.58606C16.7891 1.21112 17.2977 1.00049 17.828 1.00049C18.3583 1.00049 18.8669 1.21112 19.242 1.58606L21.414 3.75806C21.7889 4.13312 21.9996 4.64173 21.9996 5.17206C21.9996 5.70239 21.7889 6.21101 21.414 6.58606L8 20.0001Z"
				stroke={color}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="square"
			/>
		</svg>
	);
}
