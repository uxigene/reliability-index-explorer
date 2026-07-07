const API_BASE_URL = 'https://wydokyegph.execute-api.eu-central-1.amazonaws.com';

export async function get(url: string) {
	const resp = await fetch(`${API_BASE_URL}${url}`);
	if (!resp.ok) {
		throw new Error();
	}
	return await resp.json();
}

export default { get };
