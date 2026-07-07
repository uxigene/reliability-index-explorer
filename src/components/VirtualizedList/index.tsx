import type { TypeTransaction } from '../../types/transactions.ts';

import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useCategories } from '../../store/categories.ts';

import EmptyState from './components/EmptyState';

import {
	HomeIcon,
	FilmIcon,
	HeartIcon,
	TicketIcon,
	SparklesIcon,
	BanknotesIcon,
	CircleStackIcon,
	ShoppingBagIcon,
	ShieldCheckIcon,
	ShoppingCartIcon,
	PercentBadgeIcon,
	BuildingOfficeIcon,
	ExclamationCircleIcon,
	BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

const Icons = {
	'4900': HomeIcon,
	'6513': HomeIcon,
	'7832': FilmIcon,
	'8011': HeartIcon,
	'4111': TicketIcon,
	'7995': SparklesIcon,
	'6011': BanknotesIcon,
	'6540': BanknotesIcon,
	'9002': BanknotesIcon,
	'5691': ShoppingBagIcon,
	'6300': ShieldCheckIcon,
	'6051': CircleStackIcon,
	'5411': ShoppingCartIcon,
	'5310': PercentBadgeIcon,
	'9001': BuildingOfficeIcon,
	'6012': ExclamationCircleIcon,
	'5812': BuildingStorefrontIcon,
};

function formatCurrency(amount = 0, currency = 'EUR', locale = 'de-DE'): string {
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

function formatDate(date: string, locale = 'de-DE'): string {
	return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date));
}

type VirtualizedListProps = {
	list: TypeTransaction[];
};

export default function VirtualizedList({ list }: VirtualizedListProps) {
	const parentRef = useRef<HTMLDivElement>(null);
	const { categoriesState } = useCategories();

	const virtualizer = useVirtualizer({
		count: list.length,
		overscan: 10,
		estimateSize: () => 56,
		getScrollElement: () => parentRef.current,
	});

	if (list.length === 0) {
		return <EmptyState />;
	}

	return (
		<div ref={parentRef} className="h-[600px] overflow-auto px-4 outline-none">
			<div
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					position: 'relative',
				}}
			>
				{virtualizer.getVirtualItems().map((virtualRow) => {
					const transaction = list[virtualRow.index];
					const category = categoriesState[transaction.merchant_category_code];

					const iconKey = category?.code as keyof typeof Icons;
					const Icon = Icons[iconKey] ?? Icons['6540'];

					return (
						<div
							key={transaction.id}
							className="absolute left-0 top-0 flex border-b border-zinc-300 text-zinc-600 w-full h-14 items-center last:border-none"
							style={{
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							<div className="flex-2 flex items-center gap-3">
								<div className="bg-zinc-100 rounded-full p-2 size-10 shrink-0">
									<Icon className="size-full " />
								</div>
								<div className="w-full max-w-24 sm:max-w-full">
									<div className="text-black text-base truncate">{transaction.merchant_name}</div>
									<div className="text-xs truncate">{transaction.description}</div>
								</div>
							</div>
							<div className="flex-1 hidden sm:block">{formatDate(transaction.date)}</div>
							{category && <div className="flex-1 hidden sm:block">{category.name}</div>}
							<div className="flex-1 justify-end flex">
								<div
									className={twMerge(
										'text-zinc-600 rounded',
										['high_risk', 'fees'].includes(category?.group) && 'bg-red-600 text-white px-2',
										['savings', 'income'].includes(category?.group) &&
											'bg-green-600 text-white px-2',
									)}
								>
									{formatCurrency(transaction.amount, transaction.currency)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
