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

export const coinFull = {
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
