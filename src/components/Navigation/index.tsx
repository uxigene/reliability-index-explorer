import type { ReactNode } from 'react';

import { NavLink, useParams } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

function Link({ to, children }: { to: string; children: ReactNode }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				twJoin(
					'rounded-xl h-10 flex-1 flex items-center justify-center outline-none',
					isActive ? 'bg-zinc-600 text-white' : '',
				)
			}
		>
			{children}
		</NavLink>
	);
}

export default function Navigation() {
	const { userId } = useParams();
	return (
		<nav className="flex items-center bg-white rounded-2xl p-1">
			<Link to={`/${userId}/transactions`}>Transactions</Link>
			<Link to={`/${userId}/cashflow`}>Cashflow</Link>
		</nav>
	);
}
