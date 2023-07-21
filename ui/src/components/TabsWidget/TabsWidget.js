import React from "react";
import { findIndex } from "lodash";
import { TabContent, TabPane } from "reactstrap";

import TabsNav from "./TabsNav";

const TabsWidget = ({ tabs = [], pages = [] }) => {
	const activeTabIndex = findIndex(tabs, (t) => t.isActive);

	return (
		<>
			<TabsNav tabs={tabs} />

			<TabContent activeTab={activeTabIndex}>
				{pages.map((page, index) => (
					<TabPane tabId={index} key={index}>
						<>{page}</>
					</TabPane>
				))}
			</TabContent>
		</>
	);
};

export default TabsWidget;
