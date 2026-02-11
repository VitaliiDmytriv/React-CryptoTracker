import { Prisma } from "@prisma/client";

export const userSelectBase = {
  email: true,
  id: true,
  portfolios: true,
  userName: true,
} satisfies Prisma.UserSelect;

export const userSelectCredentials = {
  email: true,
  password: true,
  id: true,
  userName: true,
} satisfies Prisma.UserSelect;

export const userSelectMe = {
  email: true,
  id: true,
  userName: true,
} satisfies Prisma.UserSelect;

export const portfolioSelectBase = {
  id: true,
  portfolioName: true,
  userId: true,
} satisfies Prisma.PortfolioSelect;

export const portfolioWithCoinsSelect = {
  id: true,
  portfolioName: true,
  totalProfit: true,
  activeInvestment: true,
  currency: true,
  coins: {
    select: {
      id: true,
      name: true,
      symbol: true,
      image: true,
      activeInvestment: true,
      avgPrice: true,
      holdings: true,
      totalProfit: true,
    },
  },
} as const satisfies Prisma.PortfolioSelect;

export const coinWithTransactions = {
  id: true,
  transactions: {
    include: {
      coin: {
        select: {
          name: true,
          symbol: true,
          image: true,
        },
      },
    },
  },
  activeInvestment: true,
  avgPrice: true,
  holdings: true,
  image: true,
  name: true,
  symbol: true,
  totalProfit: true,
} satisfies Prisma.CoinSelect;

export const coinFull = {
  id: true,
  activeInvestment: true,
  avgPrice: true,
  holdings: true,
  portfolioId: true,
  image: true,
  name: true,
  symbol: true,
  totalProfit: true,
  createdAt: true,
} satisfies Prisma.CoinSelect;

export const coinSelectBase = {
  id: true,
  portfolioId: true,
  symbol: true,
  name: true,
} satisfies Prisma.CoinSelect;

export const transactionFull = {
  id: true,
  coinId: true,
  date: true,
  fees: true,
  notes: true,
  pricePerCoinBought: true,
  totalSpent: true,
  quantity: true,
  pricePerCoinSold: true,
  profit: true,
} satisfies Prisma.TransactionSelect;
