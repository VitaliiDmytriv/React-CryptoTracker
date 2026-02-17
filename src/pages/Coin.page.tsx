import { Button } from "@/components/ui/button";
import { TransactionsTable } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import { MergeActionBar } from "@/features/coins/ui/MergeActionBar";
import { createDefaultTx } from "@/lib/utils";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import type { Coin, RouteParams, TransactionWithCoin } from "@/types/global";
import type { Row } from "@tanstack/react-table";
import { Merge } from "lucide-react";

export default function Coin() {
  const { symbol } = useParams<RouteParams>();
  const openDialog = useTxDialogStore((s) => s.open);
  const { isOpenMerge, openMerge, closeMerge, txMergeInfo } = useMergeTxStore();
  const { data: coin, isLoading } = useCoin();

  const isMergeDissable = !(coin && coin.transactions.length > 1);

  function onRowClick(row: Row<TransactionWithCoin>) {
    const tx = row.original;
    if (isOpenMerge) {
      row.toggleSelected();
    } else {
      openDialog({ type: "edit", props: { initialData: tx } });
    }
  }

  useEffect(() => {
    return closeMerge;
  }, []);

  return (
    <div className="relative">
      Transactions
      <div>{symbol}</div>
      <div className="flex justify-end gap-2 mb-2">
        <Button
          disabled={isMergeDissable}
          onClick={isOpenMerge ? closeMerge : () => openMerge(coin as Coin<TransactionWithCoin>)}
        >
          <Merge />
        </Button>
        <Button
          onClick={() => openDialog({ type: "add", props: { initialData: createDefaultTx() } })}
        >
          Add transaction
        </Button>
      </div>
      {isOpenMerge && txMergeInfo && <MergeActionBar transactions={coin?.transactions || []} />}
      <div className="border rounded-md min-h-[80vh] shadow-around pb-20">
        <TransactionsTable
          transactions={coin?.transactions ?? []}
          onRowClick={onRowClick}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
