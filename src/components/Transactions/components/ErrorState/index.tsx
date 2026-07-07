import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ErrorState() {
	return (
		<div className="p-10 flex items-center justify-center gap-3 text-zinc-600">
			<ExclamationTriangleIcon className="size-6" />
			<div>Could not load transactions.</div>
		</div>
	);
}
