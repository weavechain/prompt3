import React from "react";

export default function ViewIcon({ color = "#78909C", width = 24, height = 24 }) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.37267 13.183C1.1301 12.8362 1 12.4232 1 12C1 11.5768 1.1301 11.1638 1.37267 10.817C2.94567 8.59 6.81867 4 11.9997 4C17.1807 4 21.0537 8.59 22.6267 10.817C22.8692 11.1638 22.9993 11.5768 22.9993 12C22.9993 12.4232 22.8692 12.8362 22.6267 13.183C21.0537 15.41 17.1807 20 11.9997 20C6.81867 20 2.94567 15.41 1.37267 13.183Z"
				stroke={color}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="square"
			/>
			<path
				d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
				stroke={color}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="square"
			/>
		</svg>
	);
}
