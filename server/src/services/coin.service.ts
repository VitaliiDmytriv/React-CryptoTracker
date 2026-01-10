import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";

export const coinService = {
  getBySymbol: async <TSelect extends Prisma.CoinSelect>(
    portfolioId: string,
    symbol: string,
    select: TSelect
  ): Promise<Prisma.CoinGetPayload<{ select: TSelect }> | null> => {
    return prisma.coin.findFirst({
      where: { portfolioId, symbol },
      select,
    });
  },
};
