import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import { getEntityLogo, pluralize } from "../../../helpers/Utils";
import useMediaQuery from "../../../helpers/useMediaQuery";

import s from "./Product.module.scss";
import LOCAL_STORAGE from "../../../helpers/localStorage";
import TableCell from "../../TableCell/TableCell";

export default function Product({ product, filters = {} }) {
	const stateData = LOCAL_STORAGE.loadState() || {};

	const { title, description, id, license_req } = product;
	const { searchText } = filters;

	const isMobile = useMediaQuery("(max-width: 700px)");
	const useMocks = stateData.useMocks || true;

	const detailsPath = `/${id}`;
	const productLogo = getEntityLogo(
		product.product_logo || product.logo,
		useMocks
	);

	// ------------------------------------- METHODS -------------------------------------

	return (
		<Link
			to={detailsPath}
			className={cx(s.root, searchText || isMobile ? s.active : "")}
		>
			<div
				className={s.logoContainer}
				style={{ backgroundImage: `url(${productLogo})` }}
			>
				{!productLogo && <div className={s.logoName}>{product?.title}</div>}
			</div>

			<TableCell
				type="name"
				text={title}
				textStyle={s.title}
				searchText={searchText}
				popoverText={title}
			/>

			<TableCell
				type="name"
				text={description}
				searchText={searchText}
				textStyle={s.description}
				popoverText={description}
			/>

			<div className={s.details}>
				{license_req && (
					<div className={s.license_req}>
						<span> {`> ${license_req} words`}</span>
					</div>
				)}

				<div className={s.license_req}>
					<span> {pluralize("submission", product.submissions || 0)}</span>
				</div>
			</div>
		</Link>
	);
}
