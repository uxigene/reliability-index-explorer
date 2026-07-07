import ChartJs from 'chart.js/auto';
import { useMemo, useEffect, useRef } from 'react';
import { useTransactions } from '../../store/transactions.ts';

export default function Chart() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const { transactionsState } = useTransactions();

	const monthlyData = useMemo(() => {
		const map = new Map<string, { debit: number; credit: number }>();

		for (const transaction of Object.values(transactionsState)) {
			const month = new Date(transaction.date).toISOString().slice(0, 7);

			if (!map.has(month)) {
				map.set(month, { debit: 0, credit: 0 });
			}

			const entry = map.get(month)!;

			if (transaction.type === 'debit') {
				entry.debit += transaction.amount;
			} else if (transaction.type === 'credit') {
				entry.credit += transaction.amount;
			}
		}

		// Sort by month chronologically
		return Array.from(map.entries())
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([month, values]) => ({ month, ...values }));
	}, [transactionsState]);

	useEffect(() => {
		if (!canvasRef.current) return;

		const chart = new ChartJs(canvasRef.current, {
			type: 'bar',
			data: {
				labels: monthlyData.map((d) => d.month),
				datasets: [
					{
						label: 'Credit',
						data: monthlyData.map((d) => d.credit),
						backgroundColor: 'oklch(72.3% 0.219 149.579)',
					},
					{
						label: 'Debit',
						data: monthlyData.map((d) => d.debit),
						backgroundColor: 'oklch(63.7% 0.237 25.331)',
					},
				],
			},
			options: {
				animation: false,
				responsive: true,
				plugins: {
					legend: { position: 'top' },
				},
			},
		});

		return () => chart.destroy();
	}, [monthlyData]);

	return (
		<div className="bg-white rounded-xl px-4 aspect-video flex items-center justify-center overflow-auto">
			<canvas ref={canvasRef} />
		</div>
	);
}
