import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import cx from "classnames";

import s from "./TabsNav.module.scss";

const TabsNav = ({ tabs = [] }) => {
	return (
		<div className={cx(s.root, "no-print")}>
			{tabs.map((tab, index) => (
				<NavItem
					className={cx(s.tab, { [s.active]: tab.isActive })}
					key={index}
				>
					{tab.url ? (
						<Link to={tab.url}>{tab.title}</Link>
					) : tab.onClick ? (
						<NavLink onClick={tab.onClick}>{tab.name}</NavLink>
					) : (
						<NavLink>{tab.name}</NavLink>
					)}
				</NavItem>
			))}
		</div>
	);
};

export default TabsNav;
