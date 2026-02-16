import { Button } from "@/components/ui/button";
import { TransactionsTable } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import { CointItem } from "@/features/coins/ui/CoinItem";
import { MergedStats } from "@/features/coins/ui/MergedStats";
import { createDefaultTx } from "@/lib/utils";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import type { Coin, RouteParams, TransactionWithCoin } from "@/types/global";
import type { Row } from "@tanstack/react-table";
import { Merge } from "lucide-react";

export default function Coin() {
  const { symbol } = useParams<RouteParams>();
  const openDialog = useTxDialogStore((s) => s.open);
  const { isOpenMerge, openMerge, closeMerge, txMergeInfo, rowSelection } = useMergeTxStore();
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
      {isOpenMerge && txMergeInfo && (
        <div className="absolute bottom-0 bg-slate-400">
          Now i can merge
          <div>
            <CointItem
              image={txMergeInfo.image}
              name={txMergeInfo.name}
              symbol={txMergeInfo.symbol}
            />
            <MergedStats transactions={coin?.transactions ?? []} />
            <Button
              disabled={Object.keys(rowSelection).length < 2}
              onClick={() => {
                openDialog({
                  type: "merge",
                  props: {
                    initialData: {
                      ...createDefaultTx(),
                    },
                  },
                });
              }}
            >
              Merge
            </Button>
          </div>
        </div>
      )}
      <div className="border rounded-md min-h-[80vh]">
        <TransactionsTable
          transactions={coin?.transactions ?? []}
          onRowClick={onRowClick}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
