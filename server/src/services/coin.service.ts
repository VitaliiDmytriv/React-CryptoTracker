import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { calcCoinStats } from "../domain/coins";

export const coinService = {
  getBySymbol: async <TSelect extends Prisma.CoinSelect>(
    portfolioId: string,
    symbol: string,
    select: TSelect,
  ): Promise<Prisma.CoinGetPayload<{ select: TSelect }> | null> => {
    return prisma.coin.findFirst({
      where: { portfolioId, symbol },
      select,
    });
  },

  getById: async <TSelect extends Prisma.CoinSelect>(
    coinId: string,
    select: TSelect,
  ): Promise<Prisma.CoinGetPayload<{ select: TSelect }> | null> => {
    return prisma.coin.findUnique({
      where: { id: coinId },
      select,
    });
  },

  recalculateStats: async (coinId: string, tx: Prisma.TransactionClient) => {
    const transactions = await tx.transaction.findMany({
      where: { coinId },
    });
    const stats = calcCoinStats(transactions);

    await tx.coin.update({
      where: { id: coinId },
      data: {
        ...stats,
      },
    });
  },
};
