export interface TypeTransaction {
	id: string;
	date: string;
	type: string;
	amount: number;
	user_id: string;
	currency: string;
	synced_at: string;
	account_id: string;
	description: string;
	merchant_name: string;
	merchant_category_code: string;
}

export type TypeTransactions = Record<string, TypeTransaction>;
