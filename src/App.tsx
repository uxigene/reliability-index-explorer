import { Routes, Route, Navigate } from 'react-router-dom';

import Cashflow from './routes/Cashflow';
import Transactions from './routes/Transactions';

function App() {
	return (
		<Routes>
			<Route path="/:userId">
				<Route index element={<Navigate to="transactions" replace />} />
				<Route path="cashflow" element={<Cashflow />} />
				<Route path="transactions" element={<Transactions />} />
			</Route>
			<Route path="/" element={<Navigate to="/1001/transactions" replace />} />
		</Routes>
	);
}

export default App;
