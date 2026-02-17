import { Button } from "@/components/ui/button";
import { CointItem } from "./CoinItem";
import { MergedStats } from "./MergedStats";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import type { CoinInfoForTx, TransactionWithCoin } from "@/types/global";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import { createDefaultTx } from "@/lib/utils";

type Props = {
  transactions: TransactionWithCoin[];
};

export function MergeActionBar({ transactions }: Props) {
  const txMergeInfo = useMergeTxStore((s) => s.txMergeInfo) as CoinInfoForTx;
  const rowSelection = useMergeTxStore((s) => s.rowSelection);
  const openDialog = useTxDialogStore((s) => s.open);

  function handleMergeClick() {
    openDialog({
      type: "merge",
      props: {
        initialData: {
          ...createDefaultTx(),
        },
      },
    });
  }

  return (
    <div className="absolute bottom-0 border left-0 right-0 p-2 rounded-md shadow-around">
      <div className="flex items-center justify-between">
        <div>
          <CointItem
            image={txMergeInfo.image}
            name={txMergeInfo.name}
            symbol={txMergeInfo.symbol}
          />
        </div>
        <MergedStats transactions={transactions} />
        <Button disabled={Object.keys(rowSelection).length < 2} onClick={handleMergeClick}>
          Merge
        </Button>
      </div>
    </div>
  );
}
