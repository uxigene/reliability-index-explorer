import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useReliability } from '../../../store/reliability.ts';

export default function DriversList() {
	const { reliabilityState } = useReliability();

	if (reliabilityState.drivers.length === 0) {
		return [1, 2, 3, 4, 5, 6].map((id) => <div key={id} className="h-3 my-1 bg-gray-300 w-full rounded" />);
	}

	return reliabilityState.drivers.map((name: string) => (
		<div key={name} className="text-sm text-zinc-700 flex items-center gap-1">
			<ArrowRightCircleIcon className="size-5 shrink-0" />
			{name}
		</div>
	));
}
