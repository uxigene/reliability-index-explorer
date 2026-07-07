import { InboxIcon } from '@heroicons/react/24/outline';

export default function EmptyState() {
	return (
		<div className="h-[600px] flex pt-15 justify-center gap-3 text-zinc-600">
			<InboxIcon className="size-6" />
			<div>Nothing to show.</div>
		</div>
	);
}
