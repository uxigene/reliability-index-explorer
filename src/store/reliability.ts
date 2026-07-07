import { create } from 'zustand';
import { fetchReliability } from '../api/reliability';

import type { TypeReliability } from '../types/reliability.ts';

interface TypeReliabilityStore {
	reliabilityState: TypeReliability;
	reliabilityError: boolean;
	reliabilityLoaded: boolean;
	reliabilityLoading: boolean;

	reliabilityFetch: ({ userId, from }: { userId: string; from: string }) => Promise<void>;
}

export const useReliability = create<TypeReliabilityStore>((set, get) => ({
	reliabilityState: {
		from: '',
		user_id: '',
		currency: '',
		score_band: 'NONE',
		reliability_index: 0,
		drivers: [],
		metrics: {
			good_months: 0,
			late_fee_events: 0,
			income_regularity: 0,
			negative_balance_days: 0,
			income_coverage_ratio: 0,
			essential_payments_consistency: 0,
		},
	},
	reliabilityError: false,
	reliabilityLoaded: false,
	reliabilityLoading: false,

	reliabilityFetch: async ({ userId, from }) => {
		const state = get();

		if (state.reliabilityLoaded) {
			return;
		}

		try {
			set({
				reliabilityError: false,
				reliabilityLoaded: false,
				reliabilityLoading: true,
			});

			const reliability = await fetchReliability({ userId, from });

			set({
				reliabilityState: reliability,
				reliabilityError: false,
				reliabilityLoaded: true,
				reliabilityLoading: false,
			});
		} catch (err) {
			console.error(err);
			set({
				reliabilityError: true,
				reliabilityLoaded: false,
				reliabilityLoading: false,
			});
		}
	},
}));
