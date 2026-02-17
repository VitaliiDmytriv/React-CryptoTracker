import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { buildTx, calcTxStats, parseTxDecimals } from "../domain/transactions";
import { NewTx, TxUpdatePayload } from "../types/global";

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

  getByIdWithinPortfolio: async <TSelect extends Prisma.TransactionSelect>(
    txId: string,
    portfolioId: string,
    select: TSelect,
  ): Promise<Prisma.TransactionGetPayload<{ select: TSelect }> | null> => {
    return prisma.transaction.findFirst({
      where: {
        id: txId,
        coin: {
          portfolioId,
        },
      },
      select,
    });
  },

  updateTx: async (id: string, payload: TxUpdatePayload, tx: Prisma.TransactionClient) => {
    const desimals = parseTxDecimals(payload);
    const calculated = calcTxStats(desimals);
    const data = buildTx(calculated, payload);

    const updateTx = await tx.transaction.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updateTx;
  },
  deleteTx: async (id: string, tx: Prisma.TransactionClient) => {
    const deletedTx = await tx.transaction.delete({
      where: { id },
    });

    return deletedTx;
  },

  deleteManyTx: async (ids: string[], tx: Prisma.TransactionClient) => {
    return await tx.transaction.deleteMany({
      where: { id: { in: ids } },
    });
  },

  addTx: async (transaction: NewTx, tx: Prisma.TransactionClient) => {
    return await tx.transaction.create({
      data: transaction,
    });
  },

  getCountByCoinId: async (coinId: string, tx: Prisma.TransactionClient) => {
    return await tx.transaction.count({
      where: { coinId },
    });
  },
};
