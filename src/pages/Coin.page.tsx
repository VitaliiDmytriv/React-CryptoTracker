import { TransactionsTable, TransactionDialog } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import type { Coin, RouteParams, TransactionWithCoin } from "@/types/global";

export default function Coin() {
  const { symbol } = useParams<RouteParams>();
  const [transaction, setTransaction] = useState<null | TransactionWithCoin>(null);

  const { data: coin, isLoading } = useCoin();

  function onRowClick(tr: TransactionWithCoin) {
    setTransaction(tr);
  }

  function onClose() {
    setTransaction(null);
  }

  return (
    <div>
      Transactions
      <div>{symbol}</div>
      <div>
        {transaction && (
          <TransactionDialog onClose={onClose} initialData={transaction} mode="edit" />
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
