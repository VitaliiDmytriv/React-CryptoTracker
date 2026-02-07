import { Button } from "@/components/ui/button";
import { TransactionsTable, TransactionDialog } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import { createDefaultTx } from "@/lib/utils";
import type { Coin, RouteParams, TransactionWithCoin } from "@/types/global";

export default function Coin() {
  const { symbol } = useParams<RouteParams>();
  const [transaction, setTransaction] = useState<null | TransactionWithCoin>(null);
  const [isCreatingTx, setIsCreatingTx] = useState(false);

  const { data: coin, isLoading } = useCoin();

  function onRowClick(tr: TransactionWithCoin) {
    setTransaction(tr);
  }

  function closeCreating() {
    setIsCreatingTx(false);
  }

  function onClose() {
    setTransaction(null);
  }

  return (
    <div>
      Transactions
      <div>{symbol}</div>
      <div className="text-right mb-2">
        <Button onClick={() => setIsCreatingTx(true)}>Add transaction</Button>
      </div>
      <div>
        {transaction && (
          <TransactionDialog onClose={onClose} initialData={transaction} mode="edit" />
        )}
      </div>
      <div>
        {isCreatingTx && (
          <TransactionDialog onClose={closeCreating} initialData={createDefaultTx()} mode="add" />
        )}
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
