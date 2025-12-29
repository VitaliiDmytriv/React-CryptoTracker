import { TransactionsTable, useTransactions, TransactionForm } from "@/features/transactions";
import type { Transaction } from "@/types/global";
type RouteParams = {
  symbol: string;
};

export default function Transactions() {
  const { symbol } = useParams<RouteParams>();
  const { transactions } = useTransactions(symbol!); // fetch по дані для цієї монети і передача її у таблицю
  const [transaction, setTransaction] = useState<null | Transaction>(null);

  function onRowClick(tr: Transaction) {
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
        <TransactionsTable data={transactions} onRowClick={onRowClick} />
      </div>
    </div>
  );
}
