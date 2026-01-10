import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";

export const portfolioService = {
  getByUserId: async <TSelect extends Prisma.PortfolioSelect>(
    userId: string,
    portfolioName: string,
    select: TSelect
  ): Promise<Prisma.PortfolioGetPayload<{ select: TSelect }> | null> => {
    // на майбутнє потрібно шукати не один а всі портфоліо
    return prisma.portfolio.findFirst({
      where: { userId, portfolioName },
      select,
    });
  },
};
