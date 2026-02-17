import { formatPrice, formatQuantity } from "@/lib/format";
import type { CoinInfoForTx, TransactionWithCoin } from "@/types/global";
import { useMergedTx } from "../hooks/useMergedTx";
import { useMergeTxStore } from "@/store/useMergeTxStore";

type Props = {
  transactions: TransactionWithCoin[];
};

export function MergedStats({ transactions }: Props) {
  const stats = useMergedTx(transactions);
  const txMergeInfo = useMergeTxStore((s) => s.txMergeInfo) as CoinInfoForTx;

  return (
    <div className="flex gap-5 flex-1 justify-evenly">
      <div className="min-w-[30%]">
        <span>Quantity:</span>
        <div className="">
          {formatQuantity(stats.quantity)}{" "}
          <span className="text-[#808a9d] font-light text-xs ml-1">{txMergeInfo.symbol}</span>
        </div>
      </div>
      <div className="min-w-[30%]">
        Avg Price: <div>{formatPrice(stats.pricePerCoinBought)}</div>
      </div>
    </div>
  );
}
