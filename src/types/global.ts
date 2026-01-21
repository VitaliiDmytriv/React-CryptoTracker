export interface User {
  email: string;
  id: string;
  userName: string;
}

export interface Transaction {
  id: string;
  quantity: string;
  pricePerCoinBought: string;
  totalSpent: string;
  pricePerCoinSold: null | string;
  fees: string | null;
  profit: null | string;
  coinId: string;
  notes: string | null;
  date: string;
}

export interface Coin<T> {
  name: string;
  symbol: string;
  image: string;
  totalProfit: string;
  activeInvestment: string;
  holdings: string;
  avgPrice: string;
  transactions: T[];
}

export interface Portfolio<T> {
  id: string;
  portfolioName: string;
  totalProfit: string;
  activeInvestment: string;
  currency: string;
  coins: T[];
}

export interface PortfolioResponse {
  portfolio: Portfolio<CoinShort>;
}

export type CoinShort = Omit<Coin<Transaction>, "transactions">;

export type RouteParams = {
  symbol: string;
  portfolioName: string;
};

export interface TransactionWithCoin extends Transaction {
  coin: {
    name: string;
    symbol: string;
    image: string;
  };
}
