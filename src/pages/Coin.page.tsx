import { Button } from "@/components/ui/button";
import { TransactionsTable } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import { createDefaultTx } from "@/lib/utils";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import type { Coin, RouteParams, TransactionWithCoin } from "@/types/global";

export default function Coin() {
  const { symbol } = useParams<RouteParams>();
  const { open } = useTxDialogStore();

  const { data: coin, isLoading } = useCoin();

  function onRowClick(tr: TransactionWithCoin) {
    open({ type: "edit", props: { initialData: tr } });
  }

  return (
    <div>
      Transactions
      <div>{symbol}</div>
      <div className="text-right mb-2">
        <Button onClick={() => open({ type: "add", props: { initialData: createDefaultTx() } })}>
          Add transaction
        </Button>
      </div>
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
