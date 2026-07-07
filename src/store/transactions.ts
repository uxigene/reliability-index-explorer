import { create } from 'zustand';
import { fetchTransactions } from '../api/transactions';

import type { TypeTransaction, TypeTransactions } from '../types/transactions';

interface TypeTransactionsStore {
	transactionsState: TypeTransactions;
	transactionsError: boolean;
	transactionsLoaded: boolean;
	transactionsLoading: boolean;

	transactionUpsert: (transaction: TypeTransaction) => void;
	transactionDelete: (id: string) => void;
	transactionsFetch: ({ userId, from, to }: { userId: string; from: string; to: string }) => Promise<void>;
}

export const useTransactions = create<TypeTransactionsStore>((set, get) => ({
	transactionsState: {},
	transactionsError: false,
	transactionsLoaded: false,
	transactionsLoading: false,

	transactionUpsert: (transaction) => {
		set((state) => ({
			transactionsState: {
				...state.transactionsState,
				[transaction.id]: transaction,
			},
		}));
	},

	transactionDelete: (id: string) => {
		set((state) => {
			const copy = { ...state.transactionsState };
			delete copy[id];
			return { transactionsState: copy };
		});
	},

	transactionsFetch: async ({ userId, from, to }) => {
		const state = get();

		if (state.transactionsLoaded) {
			return;
		}

		try {
			set({
				transactionsError: false,
				transactionsLoaded: false,
				transactionsLoading: true,
			});

			const transactions = await fetchTransactions({ userId, from, to });

			set({
				transactionsState: transactions,
				transactionsError: false,
				transactionsLoaded: true,
				transactionsLoading: false,
			});
		} catch (err) {
			console.error(err);
			set({
				transactionsError: true,
				transactionsLoaded: false,
				transactionsLoading: false,
			});
		}
	},
}));
