import { usePortfolio } from "@/hooks/usePortfolio";
import AssetsTable from "./AssetsTable";
import type { CoinShort } from "@/types/global";

type Props = {
  onRowClick: (coin: CoinShort) => void;
};

export function DashboardAssets({ onRowClick }: Props) {
  const { data, isLoading } = usePortfolio();

  // spinner таблиці
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{data?.coins && <AssetsTable data={data.coins} onRowClick={onRowClick} />}</>;
}
