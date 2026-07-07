import { useTransactions } from '../../../store/transactions.ts';
import { useMemo } from 'react';

export const useMemoizedTransactions = (category: string, query: string, sort: { key: string; dir: number }) => {
	const { transactionsState, ...rest } = useTransactions();

	const transactionsList = useMemo(() => {
		return [...Object.values(transactionsState)];
	}, [transactionsState]);

	const transactionsFiltered = useMemo(() => {
		if (!category) return transactionsList;
		return transactionsList.filter(({ merchant_category_code }) => merchant_category_code === category);
	}, [transactionsList, category]);

	const transactionsQueried = useMemo(() => {
		if (!query) return transactionsFiltered;
		return transactionsFiltered.filter(({ merchant_name }) =>
			merchant_name.toLowerCase().includes(query.trim().toLowerCase()),
		);
	}, [query, transactionsFiltered]);

	const transactionsSorted = useMemo(() => {
		return transactionsQueried.sort((a, b) => {
			const aVal = (a as never)[sort.key];
			const bVal = (b as never)[sort.key];

			if (sort.key === 'amount') {
				return (Number(aVal) - Number(bVal)) * sort.dir;
			}
			if (sort.key === 'date') {
				return (new Date(aVal as string).getTime() - new Date(bVal as string).getTime()) * sort.dir;
			}
			return String(aVal).localeCompare(String(bVal)) * sort.dir;
		});
	}, [transactionsQueried, sort]);

	return {
		transactionsSorted,
		...rest,
	};
};
