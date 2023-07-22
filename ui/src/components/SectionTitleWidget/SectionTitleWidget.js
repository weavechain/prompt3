import React from "react";
import cx from "classnames";
import s from "./SectionTitleWidget.module.scss";

export default function SectionTitleWidget({
	title,
	subTitle,
	icon,
	suffix,
	isMandatory,
	className = "",
	rootClassName = "",
}) {
	return (
		<div className={cx(s.root, rootClassName)}>
			<div className={s.media}>
				{icon ? icon : null}

				{title && (
					<p className={cx(s.title, className)}>
						{title} {isMandatory && <span className="mandatory">*</span>}
					</p>
				)}

				{suffix ? suffix : null}
			</div>
			{subTitle && <p className={s.subTitle}>{subTitle}</p>}
		</div>
	);
}
