export default function byId(items = [], key = 'id') {
	return items.reduce((acc, item) => {
		acc[item[key]] = item;
		return acc;
	}, {});
}
