import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getSearchPattern } from "../../helpers/Utils";

import s from "./HomePage.module.scss";

import AppHeader from "../../components/AppHeader/AppHeader";
import ProductsList from "../../components/products/ProductsList";
import TableSearch from "../../components/TableSearch/TableSearch";

export default function HomePage() {
	const [productsList, setProductsList] = useState([]);

	const { products = [] } = useSelector((state) => state.products || {});
	const allProducts = products;

	useEffect(() => {
		setProductsList([...products]);
	}, [products]);

	// ------------------------------------- METHODS -------------------------------------
	const filterProducts = (term) => {
		let filteredData = allProducts || [];

		if (term) {
			const pattern = getSearchPattern(term);
			filteredData = filteredData.filter(
				(a) => a.title?.match(pattern) || a.description?.match(pattern)
			);
		}

		setProductsList([...filteredData]);
	};

	return (
		<div className={s.root}>
			<AppHeader>
				<div className={s.title}>Evolved GPT Assistants</div>
				<div className={s.subTitle}>
					Ask questions & get better answers via decentralized prompt
					engineering Submit prompts & get paid for contributing to assistant
					evolution
				</div>
			</AppHeader>

			<div className={s.content}>
				<div className={s.searchContainer}>
					<div className={s.search}>
						<TableSearch search={filterProducts} />
					</div>
				</div>

				<ProductsList products={productsList} />
			</div>
		</div>
	);
}
