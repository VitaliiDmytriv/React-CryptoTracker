import { Button } from "@/components/ui/button";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import { Merge } from "lucide-react";
import { useCoin } from "../hooks/useCoin";
import type { Coin, TransactionWithCoin } from "@/types/global";

export function MergeCoinButton() {
  const { data: coin } = useCoin();
  const isOpenMerge = useMergeTxStore((s) => s.isOpenMerge);
  const closeMerge = useMergeTxStore((s) => s.closeMerge);
  const openMerge = useMergeTxStore((s) => s.openMerge);

  const isMergeDissable = !(coin && coin.transactions.length > 1);

  return (
    <Button
      disabled={isMergeDissable}
      className="h-auto px-3 text-xs md:text-sm py-2 sm:px-4 sm:py-2"
      onClick={isOpenMerge ? closeMerge : () => openMerge(coin as Coin<TransactionWithCoin>)}
    >
      <Merge />
    </Button>
  );
}
