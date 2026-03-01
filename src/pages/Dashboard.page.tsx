import { DashboardAssets } from "@/features/dashboard";
import type { Coin, RouteParams, Transaction } from "@/types/global";
import { StatsList } from "@/components/StatsList";
import { usePortfolio } from "@/hooks/usePortfolio";
import { EntityListHeader } from "@/components/EntityListHeader";

export default function Dashboard() {
  const { data, isLoading } = usePortfolio();
  const navigate = useNavigate();
  const { portfolioName } = useParams<RouteParams>();

  function onRowClick(coin: Omit<Coin<Transaction>, "transactions">) {
    navigate(`/dashboard/${portfolioName}/coins/${coin.symbol}`);
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <div className="my-2 h-7 font-bold">Stats</div>
      <StatsList data={data} isLoading={isLoading} showAvgPrice={false} />
      <EntityListHeader title="Assets" isMerge={false} />
      <div className="border rounded-md min-h-[80vh] shadow-around">
        <DashboardAssets data={data} isLoading={isLoading} onRowClick={onRowClick} />
      </div>
    </>
  );
}
