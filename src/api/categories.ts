import api from './api';

export async function fetchCategories() {
	return await api.get('/api/dictionaries/merchant-categories');
}
