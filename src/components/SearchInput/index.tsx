import type { ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type SearchInputProps = {
	value: string;
	onChange: (query: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.currentTarget.value);
	};

	return (
		<div className="border border-zinc-300 text-zinc-600 rounded-lg px-3 py-2 flex flex-1 items-center gap-2">
			<MagnifyingGlassIcon className="size-5" />
			<input
				type="text"
				value={value}
				className="outline-none w-full"
				placeholder="Search by merchant"
				onChange={handleInputChange}
			/>
		</div>
	);
}
