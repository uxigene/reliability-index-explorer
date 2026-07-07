import type { ReactNode } from 'react';

import Favicon from '../../components/Favicon';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCategories } from '../../store/categories.ts';
import { useReliability } from '../../store/reliability.ts';
import { useTransactions } from '../../store/transactions.ts';

import { useLiveTransactions } from '../../hooks/useLiveTransactions.ts';

const getSixMonthsAgoDate = () => {
	const today = new Date();
	const sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));
	return sixMonthsAgo.toISOString().slice(0, 10);
};

const getTodayDate = () => {
	const today = new Date();
	return today.toISOString().slice(0, 10);
};

type TypeMainProps = {
	children: ReactNode;
};

function Main({ children }: TypeMainProps) {
	const { userId } = useParams();
	useLiveTransactions(userId);

	const { categoriesFetch } = useCategories();
	const { reliabilityFetch } = useReliability();
	const { transactionsFetch } = useTransactions();

	useEffect(() => {
		categoriesFetch().then();

		if (!userId) return;
		reliabilityFetch({ userId, from: getTodayDate() }).then();
		transactionsFetch({ userId, from: getSixMonthsAgoDate(), to: getTodayDate() }).then();
	}, [categoriesFetch, reliabilityFetch, transactionsFetch, userId]);

	return (
		<div className="max-w-screen-md mx-auto flex gap-4 flex-col p-4">
			<Favicon />
			{children}
		</div>
	);
}

export default Main;
