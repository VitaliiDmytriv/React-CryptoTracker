import type { FieldValues, Path } from "react-hook-form";

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
  coin: CoinInfoForTx;
}

export interface CoinInfoForTx {
  name: string;
  symbol: string;
  image: string;
}

export type OnSuccesFc = () => void;
export type AnimateFc = () => void;
export type OnErrorFc = (error: unknown) => void;

export interface CoinGecko {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number | null;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number | null;
  market_cap: number;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  market_cap_rank: number;
  max_supply: null | number;
  name: string;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  roi: null | { times: number; currency: string; percentage: number };
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export type CryptoPricesSimple = Record<string, { usd: number }>;

export type ApiError<T extends FieldValues> = {
  message: string;
  code?: string;
  fields?: Partial<Record<Path<T>, string[]>>; // опційно для валідації
};
