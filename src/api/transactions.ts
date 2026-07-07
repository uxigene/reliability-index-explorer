import api from './api.ts';
import type { TypeTransactions } from '../types/transactions.ts';
import byId from '../helpers/byId.ts';

export async function fetchTransactions({
	to,
	from,
	userId,
}: {
	to: string;
	from: string;
	userId: string;
}): Promise<TypeTransactions> {
	const data = await api.get(`/api/users/user_${userId}/transactions?from=${from}&to=${to}`);
	return byId(data.transactions);
}
