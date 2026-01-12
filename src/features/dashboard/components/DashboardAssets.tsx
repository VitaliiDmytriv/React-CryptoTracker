import { usePortfolio } from "@/hooks/usePortfolio";
import AssetsTable from "./AssetsTable";
import type { CoinShort } from "@/types/global";

type Props = {
  onRowClick: (coin: CoinShort) => void;
};

export function DashboardAssets({ onRowClick }: Props) {
  const { data, isLoading } = usePortfolio();

  return (
    <>
      <AssetsTable isLoading={isLoading} data={data?.coins ?? []} onRowClick={onRowClick} />
      {/* <AssetsTable isLoading={true} data={[]} onRowClick={onRowClick} /> */}
    </>
  );
}
