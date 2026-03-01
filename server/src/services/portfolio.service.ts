import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { calcPortfolioStats } from "../domain/portfolios";

export const portfolioService = {
  getByUserId: async <TSelect extends Prisma.PortfolioSelect>(
    userId: string,
    portfolioName: string,
    select: TSelect,
  ): Promise<Prisma.PortfolioGetPayload<{ select: TSelect }> | null> => {
    // на майбутнє потрібно шукати не один а всі портфоліо
    return prisma.portfolio.findFirst({
      where: { userId, portfolioName },
      select,
    });
  },

  recalculateStats: async (id: string, tx: Prisma.TransactionClient) => {
    const coins = await tx.coin.findMany({ where: { portfolioId: id } });
    const stats = calcPortfolioStats(coins);

    await tx.portfolio.update({
      where: { id },
      data: {
        ...stats,
      },
    });
  },
};
