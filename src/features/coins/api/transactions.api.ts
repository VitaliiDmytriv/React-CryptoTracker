import { portfolioEndpoints } from "@/lib/endpoints";
import api from "@/api/axios";
import type { TxForm } from "../utils/transaction.schema";
import type { CreateTxApi } from "../utils/transaction.adapter";

export async function updateTransaction(
  portfolioName: string,
  symbol: string,
  txId: string,
  payload: TxForm,
) {
  await api.patch(portfolioEndpoints.txUpd(portfolioName, symbol, txId), payload);
}

export async function deleteTransaction(portfolioName: string, symbol: string, txId: string) {
  return api.delete(portfolioEndpoints.txDelete(portfolioName, symbol, txId));
}

export async function createTransaction(portfolioName: string, payload: CreateTxApi) {
  return api.create({
    url: portfolioEndpoints.txCreate(portfolioName, payload.coin.symbol),
    data: payload,
  });
}
