import { TransactionsTable, TransactionForm } from "@/features/coins";
import { useCoin } from "@/features/coins/hooks/useCoin";
import type { Coin, RouteParams, Transaction, TransactionWithCoin } from "@/types/global";

export default function Coin() {
  const { symbol } = useParams<RouteParams>();
  const [transaction, setTransaction] = useState<null | Transaction>(null);

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
      <div>{transaction && <TransactionForm onClose={onClose} initialData={transaction} />}</div>
      <div className="border rounded-md min-h-[80vh]">
        {isLoading ? (
          <p>Table is loading</p>
        ) : (
          coin && <TransactionsTable transactions={coin.transactions} onRowClick={onRowClick} />
        )}
      </div>
    </div>
  );
}
