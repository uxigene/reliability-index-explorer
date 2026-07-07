import { twMerge } from 'tailwind-merge';

type MetricsCardProps = {
	title: string;
	value: number;
	variant?: 'low' | 'high' | 'medium' | 'neutral';
};

export default function MetricsCard({ title, value, variant = 'neutral' }: MetricsCardProps) {
	const styles = {
		low: 'bg-red-500 text-white',
		high: 'bg-green-500 text-white',
		medium: 'bg-yellow-500 text-white',
		neutral: 'bg-neutral-100 text-zinc-700',
	};

	return (
		<div className="bg-white p-4 rounded-2xl flex gap-2 items-center">
			<div
				className={twMerge(
					'bg-neutral-100 rounded-full h-12 aspect-square items-center justify-center flex',
					styles[variant] ?? styles.neutral,
				)}
			>
				{value}
			</div>
			<div className="">{title}</div>
		</div>
	);
}
