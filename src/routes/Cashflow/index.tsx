import Main from '../../layouts/Main';

import Chart from '../../components/Chart';
import Dashboard from '../../components/Dashboard';
import Navigation from '../../components/Navigation';

function CashflowRoute() {
	return (
		<Main>
			<Dashboard />
			<Navigation />
			<Chart />
		</Main>
	);
}

export default CashflowRoute;
