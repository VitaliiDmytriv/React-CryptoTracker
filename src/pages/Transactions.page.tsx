import TransactionsTable from "@/features/transactions-table/TransactionsTable";

const sol = {
  symbol: "SOL",
  name: "Solana",
  image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
  activeInvestment: 394.394,
  avgPrice: 197.00000000000003,
  holdings: 2.002,
  totalProfit: 32,
  transactions: [
    {
      symbol: "SOL",
      name: "Solana",
      id: "EE1j5Icvhl",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.251,
      pricePerCoinBought: 198.79,
      fees: null,
      totalSpent: 49.89629,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-10-26",
    },
    {
      symbol: "SOL",
      name: "Solana",
      id: "GQu-c2THm0",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.154,
      pricePerCoinBought: 161.77,
      fees: null,
      totalSpent: 24.912580000000002,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-11-04",
    },
    {
      symbol: "SOL",
      name: "Solana",
      id: "i5wXD0tDUZ",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.323,
      pricePerCoinBought: 154.48,
      fees: null,
      totalSpent: 49.89704,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-11-13",
    },
    {
      symbol: "SOL",
      name: "Solana",
      id: "hH5rms5Dkt",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.219,
      pricePerCoinBought: 138.96,
      fees: null,
      totalSpent: 30.43224,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-11-14",
    },
    {
      symbol: "SOL",
      name: "Solana",
      id: "STQVtX9wTn",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.159,
      pricePerCoinBought: 132.37,
      fees: null,
      totalSpent: 21.04683,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-11-17",
    },
    {
      symbol: "SOL",
      name: "Solana",
      id: "AM5R1kxgSm",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.21,
      pricePerCoinBought: 127.75,
      fees: null,
      totalSpent: 26.8275,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-11-21",
    },
    {
      symbol: "SOL",
      name: "Solana",
      id: "fyvLSVUafG",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      quantity: 0.188,
      pricePerCoinBought: 127.86,
      fees: null,
      totalSpent: 24.03768,
      pricePerCoinSold: null,
      profit: null,
      isActive: false,
      date: "2025-11-22",
    },
  ],
};

const transactions = sol.transactions;

type RouteParams = {
  symbol: string;
};

export default function Transactions() {
  const { symbol } = useParams<RouteParams>();

  // fetch по дані для цієї монети і передача її у таблицю
  return (
    <div>
      Transactions
      <div>{symbol}</div>
      <div className="border rounded-md min-h-[80vh]">
        <TransactionsTable data={transactions} />
      </div>
    </div>
  );
}
