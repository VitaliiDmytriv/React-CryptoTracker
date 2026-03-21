import AssetsTable from "./AssetsTable";
import type { CoinShort } from "@/types/global";

type Props = {
  onRowClick: (coin: CoinShort) => void;
  data: CoinShort[] | undefined;
  isLoading: boolean;
};

export function DashboardAssets({ onRowClick, data, isLoading }: Props) {
  return (
    <>
      <AssetsTable isLoading={isLoading} data={data ?? []} onRowClick={onRowClick} />
    </>
  );
}
