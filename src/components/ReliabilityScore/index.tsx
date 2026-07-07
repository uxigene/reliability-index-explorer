import { twJoin } from 'tailwind-merge';

import DriversList from './components';
import { useReliability } from '../../store/reliability.ts';

export default function ReliabilityScore() {
	const { reliabilityState } = useReliability();

	const variant =
		{
			LOW: 'text-red-600 stroke-red-500',
			HIGH: 'text-green-600 stroke-green-500',
			MEDIUM: 'text-yellow-600 stroke-yellow-500',
			NONE: '',
		}[reliabilityState.score_band] || '';

	return (
		<div className="bg-white px-6 py-4 rounded-2xl flex gap-4 flex-col sm:flex-row ">
			<div className="relative">
				Reliability score:
				<svg viewBox="0 0 100 60" width="100%">
					<path
						d="M10 50 A40 40 0 0 1 90 50"
						fill="none"
						stroke="var(--color-gray-300)"
						strokeWidth="12"
						strokeLinecap="round"
					/>
					{reliabilityState.reliability_index > 0 && (
						<path
							className={variant}
							d="M10 50 A40 40 0 0 1 90 50"
							fill="none"
							strokeWidth="12"
							strokeLinecap="round"
							pathLength="100"
							strokeDasharray="100"
							strokeDashoffset={100 - reliabilityState.reliability_index}
						/>
					)}
				</svg>
				<div className="absolute top-20 inset-0 items-center justify-center flex flex-col">
					<div className="font-bold text-2xl text-zinc-700">{reliabilityState.reliability_index}</div>
					<div className={twJoin('font-semibold text-lg', variant)}>{reliabilityState.score_band}</div>
				</div>
			</div>
			<div className="flex flex-col gap-2 flex-1">
				Drivers:
				<DriversList />
			</div>
		</div>
	);
}
