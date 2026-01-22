import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { buildTxUpd, calcTxStats, parseTxDecimals } from "../domain/transactions";
import { updTxApi } from "../schemas/transactions.schema";

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

  updateTx: async (id: string, payload: updTxApi, tx: Prisma.TransactionClient) => {
    const desimals = parseTxDecimals(payload);
    const calculated = calcTxStats(desimals);
    const data = buildTxUpd(calculated, payload);

    const updateTx = await tx.transaction.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updateTx;
  },
};
