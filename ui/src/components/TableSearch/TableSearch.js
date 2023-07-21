import React, { useEffect, useState } from "react";
import cx from "classnames";
import { FormGroup, Input } from "reactstrap";

import { useDebounce } from "../../helpers/useDebounce";

import s from "./TableSearch.module.scss";

import SearchIcon from "../icons/SearchIcon";
import ClearIcon from "../../components/icons/ClearIcon";

const SEARCH_DELAY = 500;

export default function TableSearch(props) {
	const {
		searchText,
		setSearchText = () => {},
		className = "",
		fullWidth = true,
		search = () => {},
	} = props;

	const [queryText, setQueryText] = useState(searchText);
	const debouncedSearchTerm = useDebounce(queryText, SEARCH_DELAY);

	useEffect(() => {
		onSearch(queryText);
		// eslint-disable-next-line
	}, [debouncedSearchTerm]);

	// ------------------------------------- METHODS -------------------------------------
	const onSearch = (text) => {
		// Filter results
		search(text);

		// Highlight text
		setSearchText(text);
	};

	const clearSearch = () => {
		onSearch("");
		setQueryText("");
	};

	return (
		<FormGroup className={cx(s.root, className, { [s.short]: !fullWidth })}>
			<Input
				className={cx(s.searchInput, {
					[s.placeholder]: !searchText,
				})}
				placeholder={"Search"}
				value={queryText || ""}
				onChange={(e) => setQueryText(e.target.value)}
			/>

			{searchText ? (
				<div className={s.clear} onClick={clearSearch}>
					<ClearIcon />
				</div>
			) : (
				<div className={s.iconContainer}>
					<SearchIcon />
				</div>
			)}
		</FormGroup>
	);
}
