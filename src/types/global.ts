export interface User {
  email: string;
  id: string;
  userName: string;
}

export interface Transaction {
  symbol: string;
  name: string;
  id: string;
  image: string;
  quantity: number | null;
  pricePerCoinBought: number | null;
  fees: number | null;
  totalSpent: number | null;
  pricePerCoinSold: null | number;
  profit: null | number;
  date: string;
}

export interface Coin {
  name: string;
  symbol: string;
  image: string;
  totalProfit: number;
  activeInvestment: number;
  holdings: number;
  avgPrice: number;
  transactions: Transaction[];
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

export type CoinShort = Omit<Coin, "transactions">;
