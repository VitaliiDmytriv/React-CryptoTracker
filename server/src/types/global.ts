export interface DataBase {
  users: User[];
}

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  portfolio: Portfolio;
}

export interface Portfolio {
  totalProfit: number;
  activeInvestment: number;
  coins: Record<string, Coin>;
}

export interface Transaction {
  id: string;
  coinId: string;
  date: string;
  fees: number | null;
  notes: string | null;
  pricePerCoinBought: number | null;
  quantity: number | null;
  pricePerCoinSold: null | number;
  profit: null | number;
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

export type DecodedUser = {
  exp: number;
  iat: number;
  id: string;
};
export type PortfolioBase = {
  id: string;
  portfolioName: string;
  userId: string;
};
export type coinSelectBase = {
  id: string;
  portfolioId: string;
  symbol: string;
  name: string;
};

export type TxUpdatePayload = {
  quantity: number;
  pricePerCoinBought: number;
  pricePerCoinSold: number | null;
  fees: number | null;
  date: string;
};
