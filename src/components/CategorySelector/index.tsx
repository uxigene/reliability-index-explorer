import type { ChangeEvent } from 'react';
import { useCategories } from '../../store/categories.ts';

type CategorySelectorProps = {
	onChange: (category: string) => void;
};

export default function CategorySelector({ onChange }: CategorySelectorProps) {
	const { categoriesState, categoriesError } = useCategories();

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	if (categoriesError) {
		return null;
	}

	return (
		<div className="border border-zinc-300 text-zinc-600 rounded-lg px-3 items-center gap-2">
			<select onChange={handleChange} className="py-2 outline-none min-w-48 w-full">
				<option value="">All</option>
				{Object.values(categoriesState).map(({ code, name }) => (
					<option key={code} value={code}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}
