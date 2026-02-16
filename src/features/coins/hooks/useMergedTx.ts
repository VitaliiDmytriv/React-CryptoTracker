import { calcMergedTx } from "@/lib/calcMergedTx";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import type { TransactionWithCoin } from "@/types/global";

export const useMergedTx = (transactions: TransactionWithCoin[]) => {
  const rowSelection = useMergeTxStore((s) => s.rowSelection);

  return useMemo(() => {
    return calcMergedTx(transactions, rowSelection);
  }, [transactions, rowSelection]);
};
