import { useState } from 'react';

import Header from '../VirtualizedList/components/Header';

import SearchInput from '../SearchInput';
import VirtualizedList from '../VirtualizedList';
import CategorySelector from '../CategorySelector';

import ErrorState from './components/ErrorState';
import LoadingState from './components/LoadingState';

import { useMemoizedTransactions } from './hooks/useMemoizedTransactions.ts';

const Transactions = () => {
	const [sort, setSort] = useState({ key: 'date', dir: -1 });
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState('');

	const { transactionsSorted, transactionsError, transactionsLoaded, transactionsLoading } = useMemoizedTransactions(
		category,
		query,
		sort,
	);

	const handleSortChange = (key: string) => {
		setSort((prev) => ({
			key,
			dir: prev.key === key ? (prev.dir === 1 ? -1 : 1) : 1,
		}));
	};

	const handleCategoryChange = (value: string) => {
		setCategory(value);
	};

	const handleSearchInputChange = (value: string) => {
		setQuery(value);
	};

	return (
		<div className="bg-white rounded-xl pb-4 text-sm">
			<div className="flex p-4 gap-3 flex-col sm:flex-row">
				<SearchInput value={query} onChange={handleSearchInputChange} />
				<CategorySelector onChange={handleCategoryChange} />
			</div>
			{transactionsError && <ErrorState />}
			{transactionsLoading && <LoadingState />}
			{transactionsLoaded && (
				<>
					<Header sort={sort} onSortChange={handleSortChange} />
					<VirtualizedList list={transactionsSorted} />
				</>
			)}
		</div>
	);
};

export default Transactions;
