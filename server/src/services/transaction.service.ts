import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";

export const transactionService = {
  getById: async <TSelect extends Prisma.TransactionSelect>(
    txId: string,
    select: TSelect,
  ): Promise<Prisma.TransactionGetPayload<{ select: TSelect }> | null> => {
    return prisma.transaction.findUnique({
      where: { id: txId },
      select,
    });
  },
};
