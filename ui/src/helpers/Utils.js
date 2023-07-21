import { escapeRegExp } from "lodash";
import moment from "moment";
import AppConfig from "../AppConfig";
import LOCAL_STORAGE from "../helpers/localStorage";
import DEFAULT_DEMO_DATA from "../_mocks/DEFAULT_DEMO_DATA";

export const DATE_FORMAT = "YYYY/MM/DD";
export const DATETIME_FORMAT = "YYYY-MM-DD hh:mm:ss";
export const DATETIME_MS_FORMAT = "YYYY-MM-DD hh:mm:ss ms";

export const wordsCount = (text) => {
	return text ? text.trim().split(" ").length : 0;
};

export const hasItems = (list) => {
	return list && list.length > 0;
};

export const isSelectAllRegex = (regex) => {
	return regex === "*" || regex === ".*";
};

export const escapeRegexp = (str) => {
	return str != null ? str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : null;
};

export const numberToLocaleString = (number) => {
	return number ? number.toLocaleString() : number;
};

export const formatLargeNumber = (number, decPlaces = 0) => {
	decPlaces = Math.pow(10, decPlaces);
	const abbrev = ["k", "m", "b", "t"];

	for (let i = abbrev.length - 1; i >= 0; i--) {
		const size = Math.pow(10, (i + 1) * 3);

		if (size <= number) {
			number = Math.round((number * decPlaces) / size) / decPlaces;

			if (number === 1000 && i < abbrev.length - 1) {
				number = 1;
			}

			number += abbrev[i];
			break;
		}
	}

	return number;
};

export const generateKey = () => {
	const length = 16;
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";

	for (let i = 0, n = charset.length; i < length; ++i) {
		result += charset.charAt(Math.floor(Math.random() * n));
	}
	return result;
};

export const pluralize = (text, itemsCount, skipNumber = false) => {
	return skipNumber
		? `${itemsCount * 1 === 1 ? text : text + "s"}`
		: `${itemsCount} ${itemsCount * 1 === 1 ? text : text + "s"}`;
};

export const getKeyByValue = (object, value) => {
	for (let prop in object) {
		if (object.hasOwnProperty(prop)) {
			if (object[prop] === value) return prop;
		}
	}
};

export const getSearchPattern = (term) => {
	return new RegExp(escapeRegExp(term).split(" ").join("|"), "gi");
};

const _downloadFile = ({ url, filename }) => {
	let hlink = document.createElement("a");
	hlink.href = url;
	hlink.download = filename;
	hlink.click();
};

export const downloadAsCsv = (data, columns, fileName = "download.csv") => {
	let fileData = null;
	if (false) {
		fileData = [];
		fileData.push(columns);

		data.forEach((d) => {
			const row = columns.map((col) => d[col.toLocaleLowerCase()]);
			fileData.push(row);
		});
	}

	const content = fileData ? fileData.join("\n") : data;
	const csvData = new Blob([content], { type: "text/csv" });
	const url = URL.createObjectURL(csvData);

	_downloadFile({ url, filename: fileName });
};

export const downloadFile = ({ data, fileName, fileType }) => {
	const blob = new Blob([data], { type: fileType });
	const a = document.createElement("a");
	a.download = fileName;
	a.href = window.URL.createObjectURL(blob);
	const clickEvt = new MouseEvent("click", {
		view: window,
		bubbles: true,
		cancelable: true,
	});
	a.dispatchEvent(clickEvt);
	a.remove();
};

export const now = () => {
	return moment().format(DATETIME_FORMAT);
};

export const getUserTimezone = () => {
	const tz = new Date()
		.toLocaleTimeString("en-us", { timeZoneName: "short" })
		.split(" ")[2];

	return tz ? "(" + tz.replace(/[^a-z]+/gi, "") + ")" : null;
};

export const formatAmount = (
	amount,
	precision = 2,
	limitExceeded,
	minDecimals = 0
) => {
	if (!amount) amount = 0;
	//amount = ("" + amount).replace(/\D/g, "");

	const result = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: minDecimals,
		maximumFractionDigits: precision,
	}).format(amount);

	return limitExceeded && result > 0 ? `(${result})` : result;
};

export const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		window.location.hostname === "[::1]" ||
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
);

export const openExternalPage = (history, url, params = []) => {
	const fullUrl = `${AppConfig.UI_URL}/#${url}?${params.join("&")}`;

	if (isLocalhost) {
		history.push({ pathname: url, search: `?${params.join("&")}` });
	} else {
		window.open(fullUrl, "_blank");
	}
};

export const formatFeeTableNames = (tables) => {
	return !hasItems(tables)
		? "None"
		: tables[0] === "*"
		? "All"
		: tables.map((t) => t.name).join(", ");
};

export const getColumnFilter = (columnType) => {
	return {
		placeholder: "Input to filter",
		delay: 100,
		type:
			columnType === "integer"
				? "NumberFilter"
				: columnType === "date"
				? "DateFilter"
				: "TextFilter",
		numberComparators: ["=", "!=", ">", ">=", "<", "<="],
		defaultValue:
			columnType === "integer" || columnType === "date"
				? {
						//number: 1 * data[0][columnName],
						comparator: columnType === "integer" ? "=" : ">",
				  }
				: null,
	};
};

export const encodeData = (data) => {
	try {
		return btoa(JSON.stringify(data));
	} catch (error) {
		console.error(error);
	}
};

export const decodeData = (encodedData) => {
	try {
		return JSON.parse(atob(encodedData));
	} catch (error) {}
};

export const formatBytes = (bytes, decimals = 2) => {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// ------------------------------------- MEDIA -------------------------------------
export const getImageType = (dataset_logo) => {
	let imageType = "svg+xml";
	if (dataset_logo) {
		const logo = Buffer.from(dataset_logo, "base64");
		if (logo.length > 10) {
			if (String.fromCharCode(...logo.subarray(6, 10)) === "JFIF") {
				imageType = "jpeg";
			} else if (String.fromCharCode(...logo.subarray(1, 4)) === "PNG") {
				imageType = "png";
			} else if (String.fromCharCode(...logo.subarray(0, 3)) === "GIF") {
				imageType = "gif";
			}
		}
	}
	return imageType;
};

export const getEntityLogo = (logo, useMocks, defaultLogo) => {
	let imageType = getImageType(logo);

	return useMocks
		? logo
		: logo
		? "data:image/" + imageType + ";base64," + encodeURIComponent(logo)
		: defaultLogo || DEFAULT_DEMO_DATA.DEFAULT_DATASET_LOGO;
};

export const extractLogo = (logo, useMocks) => {
	return logo.startsWith("http://") || logo.startsWith("https://")
		? logo
		: getEntityLogo(logo, useMocks, DEFAULT_DEMO_DATA.DEFAULT_DATASET_LOGO);
};

// ------------------------------------- FOR DUMMY DATA -------------------------------------
export const toggleMockedData = (useMockedData) => {
	let oldState = LOCAL_STORAGE.loadState() || {};
	const useMocks = oldState.useMocks;

	LOCAL_STORAGE.saveState({
		...oldState,
		useMocks: useMockedData || !useMocks,
	});

	window.location.reload(false);
};

export const randomBoolFlag = () => {
	return Math.round(Math.random() * 10) % 2 === 0;
};

// ------------------------------------- MEDIA -------------------------------------

const Utils = {
	DATE_FORMAT,
	DATETIME_FORMAT,
	downloadFile,
	escapeRegexp,
	formatAmount,
	formatFeeTableNames,
	formatLargeNumber,
	generateKey,
	getKeyByValue,
	hasItems,
	now,
	numberToLocaleString,
	openExternalPage,
	pluralize,
	randomBoolFlag,
	toggleMockedData,
	wordsCount,
};

export default Utils;
