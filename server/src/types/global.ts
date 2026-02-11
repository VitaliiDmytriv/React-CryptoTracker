import { Prisma } from "@prisma/client";

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
  quantity: Prisma.Decimal;
  pricePerCoinBought: Prisma.Decimal;
  fees: Prisma.Decimal | null;
  totalSpent: Prisma.Decimal;
  pricePerCoinSold: Prisma.Decimal | null;
  profit: Prisma.Decimal | null;
  notes: string | null;
  date: Date;
}

export interface Coin {
  id: string;
  portfolioId: string;
  name: string;
  symbol: string;
  image: string;
  activeInvestment: Prisma.Decimal;
  avgPrice: Prisma.Decimal;
  holdings: Prisma.Decimal;
  totalProfit: Prisma.Decimal;
  createdAt: Date;
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
  quantity: string;
  pricePerCoinBought: string;
  pricePerCoinSold: string;
  fees: string;
  date: string;
  name?: string;
};

export type TxAddPayload = {
  quantity: string;
  pricePerCoinBought: string;
  pricePerCoinSold: string;
  fees: string;
  date: string;
  coin: {
    name: string;
    image: string;
    symbol: string;
  };
};

export type TxDecimalFields = {
  quantity: string;
  pricePerCoinBought: string;
  pricePerCoinSold: string;
  fees: string;
};

export type NewTx = {
  id: string;
  coinId: string;
  quantity: string;
  pricePerCoinBought: string;
  pricePerCoinSold: string | null;
  fees: string | null;
  totalSpent: string;
  profit: string | null;
  date: Date;
};
