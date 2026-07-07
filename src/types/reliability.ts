export type TypeDrivers = string[];
export type TypeScoreBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'NONE';

export interface TypeMetrics {
	good_months: number;
	late_fee_events: number;
	income_regularity: number;
	income_coverage_ratio: number;
	negative_balance_days: number;
	essential_payments_consistency: number;
}

export interface TypeReliability {
	from: string;
	user_id: string;
	metrics: TypeMetrics;
	drivers: TypeDrivers;
	currency: string;
	score_band: TypeScoreBand;
	reliability_index: number;
}
