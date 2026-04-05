import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';

export default function Dashboard() {
  return (
    <div>
      <div className="page-title">Overview</div>
      <div className="page-subtitle">Your financial snapshot for this month</div>
      <SummaryCards />
      <div className="grid-2">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
    </div>
  );
}