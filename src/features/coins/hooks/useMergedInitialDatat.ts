import type { TransactionWithCoin } from "@/types/global";
import { useCoin } from "./useCoin";
import { useMergedTx } from "./useMergedTx";

export function useMergedInitialData(defaultData: TransactionWithCoin) {
  const { data: coin } = useCoin();
  const txName = coin?.transactions[0].coin.name;
  const symbol = coin?.transactions[0].coin.symbol;

  const mergedTx = useMergedTx(coin?.transactions || []);

  const initialTx = {
    ...defaultData,
    ...mergedTx,
    coin: {
      ...defaultData.coin,
      name: txName || "merging",
      symbol: symbol || "",
    },
  };

  return initialTx;
}
