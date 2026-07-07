import Main from '../../layouts/Main';

import Dashboard from '../../components/Dashboard';
import Navigation from '../../components/Navigation';
import Transactions from '../../components/Transactions';

function TransactionsRoute() {
	return (
		<Main>
			<Dashboard />
			<Navigation />
			<Transactions />
		</Main>
	);
}

export default TransactionsRoute;
