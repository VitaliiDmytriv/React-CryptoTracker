export interface User {
  email: string;
  id: string;
  userName: string;
}

export interface Transaction {
  id: string;
  quantity: number | null;
  pricePerCoinBought: number | null;
  fees: number | null;
  coinId: string;
  notes: string | null;
  totalSpent: number | null;
  pricePerCoinSold: null | number;
  profit: null | number;
  date: string;
}

export interface Coin<T> {
  name: string;
  symbol: string;
  image: string;
  totalProfit: number;
  activeInvestment: number;
  holdings: number;
  avgPrice: number;
  transactions: T[];
}

export interface Portfolio<T> {
  id: string;
  portfolioName: string;
  totalProfit: number;
  activeInvestment: number;
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
