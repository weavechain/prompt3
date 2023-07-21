import React from "react";

export default function SearchIcon({
	color = "#FFF",
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
			<path
				d="M24.2939 22.5786H23.3905L23.0703 22.2699C24.2297 20.9251 24.8669 19.2083 24.8656 17.4328C24.8656 15.9627 24.4297 14.5257 23.613 13.3034C22.7963 12.081 21.6354 11.1284 20.2772 10.5658C18.9191 10.0032 17.4246 9.85603 15.9827 10.1428C14.5409 10.4296 13.2165 11.1375 12.177 12.177C11.1375 13.2165 10.4296 14.5409 10.1428 15.9827C9.85603 17.4246 10.0032 18.9191 10.5658 20.2772C11.1284 21.6354 12.081 22.7963 13.3034 23.613C14.5257 24.4297 15.9627 24.8656 17.4328 24.8656C19.2739 24.8656 20.9663 24.191 22.2699 23.0703L22.5786 23.3905V24.2939L28.2962 30L30 28.2962L24.2939 22.5786V22.5786ZM17.4328 22.5786C14.5855 22.5786 12.287 20.2802 12.287 17.4328C12.287 14.5855 14.5855 12.287 17.4328 12.287C20.2802 12.287 22.5786 14.5855 22.5786 17.4328C22.5786 20.2802 20.2802 22.5786 17.4328 22.5786Z"
				fill={color}
			/>
		</svg>
	);
}