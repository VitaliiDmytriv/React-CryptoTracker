import AssetsTable from "./AssetsTable";
import type { CoinShort, Portfolio } from "@/types/global";

type Props = {
  onRowClick: (coin: CoinShort) => void;
  data: Portfolio<CoinShort> | undefined;
  isLoading: boolean;
};

export function DashboardAssets({ onRowClick, data, isLoading }: Props) {
  return (
    <>
      <AssetsTable isLoading={isLoading} data={data?.coins ?? []} onRowClick={onRowClick} />
    </>
  );
}
