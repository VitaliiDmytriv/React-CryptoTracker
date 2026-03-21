import { DashboardAssets } from "@/features/dashboard";
import type { Coin, RouteParams, Transaction } from "@/types/global";
import { StatsList } from "@/components/StatsList";
import { EntityListHeader } from "@/components/EntityListHeader";
import { usePortfolioMetrics } from "@/hooks/usePortfolioMetrics";

export default function Dashboard() {
  const navigate = useNavigate();
  const { portfolioName } = useParams<RouteParams>();
  const { assets, metrics, isLoading } = usePortfolioMetrics();

  if (!isLoading) {
    console.log(metrics);
  }

  function onRowClick(coin: Omit<Coin<Transaction>, "transactions">) {
    navigate(`/dashboard/${portfolioName}/coins/${coin.symbol}`);
  }

  return (
    <>
      <div className="my-2 h-7 font-bold capitalize">Portfolio: {portfolioName}</div>
      <StatsList data={metrics} isLoading={isLoading} showAvgPrice={false} />
      <EntityListHeader title="Assets" isMerge={false} />
      <div className="border rounded-md min-h-[80vh] shadow-around">
        <DashboardAssets data={assets} isLoading={isLoading} onRowClick={onRowClick} />
      </div>
    </>
  );
}
