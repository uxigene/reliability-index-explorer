import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { twJoin } from 'tailwind-merge';

import { useCategories } from '../../../../store/categories.ts';

type HeaderProps = {
	sort: { key: string; dir: number };
	onSortChange: (value: string) => void;
};

export default function Header({ sort, onSortChange }: HeaderProps) {
	const { categoriesError } = useCategories();

	const handleNameClick = () => {
		onSortChange('merchant_name');
	};
	const handleDateClick = () => {
		onSortChange('date');
	};
	const handleCategoryClick = () => {
		onSortChange('merchant_category_code');
	};
	const handleAmountClick = () => {
		onSortChange('amount');
	};

	return (
		<div className="flex border-b border-zinc-300 text-zinc-600 mx-4 pb-3">
			<button className="flex items-center gap-2 flex-2 cursor-pointer outline-none" onClick={handleNameClick}>
				Name
				{sort.key === 'merchant_name' && (
					<ArrowDownIcon className={twJoin('size-4', sort.dir === 1 ? 'rotate-0' : 'rotate-180')} />
				)}
			</button>
			<button
				className="items-center gap-2 flex-1 cursor-pointer outline-none hidden sm:flex "
				onClick={handleDateClick}
			>
				Date
				{sort.key === 'date' && (
					<ArrowDownIcon className={twJoin('size-4', sort.dir === 1 ? 'rotate-0' : 'rotate-180')} />
				)}
			</button>
			{!categoriesError && (
				<button
					className="items-center gap-2 flex-1 cursor-pointer outline-none hidden sm:flex"
					onClick={handleCategoryClick}
				>
					Category
					{sort.key === 'merchant_category_code' && (
						<ArrowDownIcon className={twJoin('size-4', sort.dir === 1 ? 'rotate-0' : 'rotate-180')} />
					)}
				</button>
			)}
			<button
				className="flex items-center justify-end gap-2 flex-1 cursor-pointer outline-none"
				onClick={handleAmountClick}
			>
				Amount
				{sort.key === 'amount' && (
					<ArrowDownIcon className={twJoin('size-4', sort.dir === 1 ? 'rotate-0' : 'rotate-180')} />
				)}
			</button>
		</div>
	);
}
