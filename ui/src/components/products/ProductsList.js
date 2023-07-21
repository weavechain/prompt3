import React from "react";
import cx from "classnames";

import Product from "./product/Product";

import s from "./ProductsList.module.scss";

export default function ProductsList({ products = [] }) {
	return (
		<div
			className={cx(
				s.root,
				products.length === 1 ? s.one : products.length < 5 ? s.two : ""
			)}
		>
			{products.map((product, index) => (
				<Product product={product} key={index} />
			))}
		</div>
	);
}
