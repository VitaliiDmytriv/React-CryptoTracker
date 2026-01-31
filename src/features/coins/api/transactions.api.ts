import { portfolioEndpoints } from "@/lib/endpoints";
import api from "@/api/axios";
import type { updTxForm } from "../utils/transaction.schema";

export async function updateTransaction(
  portfolioName: string,
  symbol: string,
  txId: string,
  payload: updTxForm,
) {
  await api.patch(portfolioEndpoints.txUpd(portfolioName, symbol, txId), payload);
}

export async function deleteTransaction(portfolioName: string, symbol: string, txId: string) {
  return await api.delete(portfolioEndpoints.txDelete(portfolioName, symbol, txId));
}
