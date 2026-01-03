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

export type DecodedUser = {
  exp: number;
  iat: number;
  id: string;
};
