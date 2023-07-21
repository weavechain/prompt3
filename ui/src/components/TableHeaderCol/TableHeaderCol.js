import React, { useRef, useState } from "react";
import { Tooltip } from "reactstrap";
import { TableHeaderColumn } from "react-bootstrap-table";

import s from "./TableHeaderCol.module.scss";

export default function TableHeaderCol(props) {
	const { title, popoverText } = props;

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const popoverIdRef = useRef();

	return (
		<>
			<TableHeaderColumn {...props}>
				<div
					className={s.root}
					onMouseEnter={() => setTooltipOpen(true)}
					onMouseLeave={() => setTooltipOpen(false)}
					ref={popoverIdRef}
				>
					{title}
				</div>
			</TableHeaderColumn>

			{tooltipOpen ? (
				<Tooltip placement="top" target={popoverIdRef} isOpen={true}>
					<p className={"tooltip-text"}>{popoverText ? popoverText : title}</p>
				</Tooltip>
			) : null}
		</>
	);
}
