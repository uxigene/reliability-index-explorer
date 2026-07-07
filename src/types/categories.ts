export interface TypeCategory {
	code: string;
	name: string;
	group: string;
}

export type TypeCategories = Record<string, TypeCategory>;
