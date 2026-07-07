import { useEffect } from 'react';
import { useTransactions } from '../store/transactions.ts';

const SSE_BASE_URL = 'https://vpjjdvoeej5izlqy3nnpllmyua0idsrp.lambda-url.eu-central-1.on.aws';

export function useLiveTransactions(userId: string | undefined) {
	const { transactionUpsert, transactionDelete } = useTransactions();

	useEffect(() => {
		if (!userId) return;
		const es = new EventSource(`${SSE_BASE_URL}/api/users/${userId}/transaction-events`);

		const handleAdded = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			transactionUpsert(data.transaction);
		};

		const handleUpdated = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			transactionUpsert(data.transaction);
		};

		const handleDeleted = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			transactionDelete(data.transaction_id);
		};

		es.addEventListener('TRANSACTION_ADDED', handleAdded);
		es.addEventListener('TRANSACTION_UPDATED', handleUpdated);
		es.addEventListener('TRANSACTION_DELETED', handleDeleted);

		return () => {
			es.removeEventListener('TRANSACTION_ADDED', handleAdded);
			es.removeEventListener('TRANSACTION_UPDATED', handleUpdated);
			es.removeEventListener('TRANSACTION_DELETED', handleDeleted);
			es.close();
		};
	}, [transactionUpsert, transactionDelete, userId]);
}
