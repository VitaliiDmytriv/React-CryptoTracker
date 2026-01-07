import AssetsTable from "./AssetsTable";
import { useDashboardAssets } from "../hooks/useDashboardAssets";
import type { CoinShort } from "../types/dashboard.types";

type Props = {
  onRowClick: (coin: CoinShort) => void;
};

export function DashboardAssets({ onRowClick }: Props) {
  const { data, isLoading } = useDashboardAssets();

  // spinner таблиці
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{data?.coins && <AssetsTable data={data.coins} onRowClick={onRowClick} />}</>;
}
