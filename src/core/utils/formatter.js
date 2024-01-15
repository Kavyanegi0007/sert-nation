export function formatNumber(num) {
	const nfObject = new Intl.NumberFormat("en-IN");
	return nfObject.format(num);
}

export function formatCurrency(num) {
	const nfObject = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	});
	return nfObject.format(num).replace(/(\.|,)00$/g, "");
}

export function formatSearchToObject(search) {
	if (!search || search.length === 0) return {};

	search = search.replace("?", "");

	const firstSplit = search.split("&");
	const result = {};

	firstSplit.forEach((item) => {
		const secondSplit = item.split("=");
		result[secondSplit[0]] = secondSplit[1];
	});

	return result;
}
