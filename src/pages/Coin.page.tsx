import { EntityListHeader } from "@/components/EntityListHeader";
import { StatsList } from "@/components/StatsList";
import { CoinIdentityBar, TransactionsTable } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import { MergeActionBar } from "@/features/coins/ui/MergeActionBar";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import type { Coin, TransactionWithCoin } from "@/types/global";
import type { Row } from "@tanstack/react-table";

export default function Coin() {
  const isOpenMerge = useMergeTxStore((s) => s.isOpenMerge);
  const closeMerge = useMergeTxStore((s) => s.closeMerge);
  const openDialog = useTxDialogStore((s) => s.open);
  const { data: coin, isLoading } = useCoin();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <CoinIdentityBar coin={coin} />
      <StatsList data={coin} isLoading={isLoading} showAvgPrice={true} />
      <EntityListHeader title="Transactions" isMerge={true} />
      <div className="relative border rounded-md min-h-[80vh] shadow-around pb-16">
        <TransactionsTable
          transactions={coin?.transactions ?? []}
          onRowClick={onRowClick}
          isLoading={isLoading}
        />
        <MergeActionBar transactions={coin?.transactions || []} />
      </div>
    </div>
  );
}
