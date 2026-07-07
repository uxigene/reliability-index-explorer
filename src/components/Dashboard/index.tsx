import { useReliability } from '../../store/reliability.ts';
import { useMemo } from 'react';

import MetricsCard from '../MetricsCard';
import ReliabilityScore from '../ReliabilityScore';

function Dashboard() {
	const { reliabilityState, reliabilityError, reliabilityLoading } = useReliability();

	const incomeRegularityProps = useMemo(() => {
		const title = 'Income Regularity';
		const value = reliabilityState.metrics.income_regularity;
		const variant = value >= 0.75 ? ('high' as const) : value >= 0.5 ? ('medium' as const) : ('low' as const);
		return { title, value, variant };
	}, [reliabilityState]);

	const incomeCoverageRatioProps = useMemo(() => {
		const title = 'Income Coverage Ratio';
		const value = reliabilityState.metrics.income_coverage_ratio;
		const variant = value >= 1.5 ? ('high' as const) : value >= 1.0 ? ('medium' as const) : ('low' as const);
		return { title, value, variant };
	}, [reliabilityState]);

	const essentialPaymentsConsistencyProps = useMemo(() => {
		const title = 'Essential Payments Consistency';
		const value = reliabilityState.metrics.essential_payments_consistency;
		const variant = value >= 0.75 ? ('high' as const) : value >= 0.5 ? ('medium' as const) : ('low' as const);
		return { title, value, variant };
	}, [reliabilityState]);

	const goodMonthsProps = useMemo(() => {
		const title = 'Good Months';
		const value = reliabilityState.metrics.good_months;
		const variant = value >= 5 ? ('high' as const) : value >= 3 ? ('medium' as const) : ('low' as const);
		return { title, value, variant };
	}, [reliabilityState]);

	const negativeBalanceDaysProps = useMemo(() => {
		const title = 'Negative Balance Days';
		const value = reliabilityState.metrics.negative_balance_days;
		const variant = value <= 3 ? ('high' as const) : value <= 10 ? ('medium' as const) : ('low' as const);
		return { title, value, variant };
	}, [reliabilityState]);

	const lateFeeEventsProps = useMemo(() => {
		const title = 'Late Fee Events';
		const value = reliabilityState.metrics.late_fee_events;
		const variant = value <= 3 ? ('high' as const) : value <= 10 ? ('medium' as const) : ('low' as const);
		return { title, value, variant };
	}, [reliabilityState]);

	const metricsCards = [
		incomeRegularityProps,
		incomeCoverageRatioProps,
		essentialPaymentsConsistencyProps,
		goodMonthsProps,
		negativeBalanceDaysProps,
		lateFeeEventsProps,
	];

	return (
		<div className="flex gap-4 flex-col">
			<ReliabilityScore />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
				{metricsCards.map((props) => (
					<MetricsCard
						key={props.title}
						{...props}
						variant={reliabilityError || reliabilityLoading ? 'neutral' : props.variant}
					/>
				))}
			</div>
		</div>
	);
}

export default Dashboard;
