import { create } from 'zustand';
import { fetchCategories } from '../api/categories';

import type { TypeCategories } from '../types/categories';
import byId from '../helpers/byId.ts';

interface TypeCategoriesStore {
	categoriesState: TypeCategories;
	categoriesError: boolean;
	categoriesLoaded: boolean;
	categoriesLoading: boolean;

	categoriesFetch: () => Promise<void>;
}

export const useCategories = create<TypeCategoriesStore>((set, get) => ({
	categoriesState: {},
	categoriesError: false,
	categoriesLoaded: false,
	categoriesLoading: false,

	categoriesFetch: async () => {
		const state = get();

		if (state.categoriesLoaded) {
			return;
		}

		try {
			set({
				categoriesError: false,
				categoriesLoaded: false,
				categoriesLoading: true,
			});

			const data = await fetchCategories();

			set({
				categoriesState: byId(data.categories, 'code'),
				categoriesError: false,
				categoriesLoaded: true,
				categoriesLoading: false,
			});
		} catch (err) {
			console.error(err);
			set({
				categoriesError: true,
				categoriesLoaded: false,
				categoriesLoading: false,
			});
		}
	},
}));
