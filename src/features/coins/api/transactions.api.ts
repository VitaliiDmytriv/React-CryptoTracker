import { portfolioEndpoints } from "@/lib/endpoints";
import api from "@/api/axios";
import type { TxForm } from "../utils/transaction.schema";
import type { CreateTxApi } from "../utils/transaction.adapter";
import { ACTIONS } from "@/lib/utils";

export async function updateTransaction(portfolioName: string, txId: string, payload: TxForm) {
  await api.patch(portfolioEndpoints.txUpd(portfolioName, txId), {
    action: ACTIONS.edit,
    payload,
  });
}

export async function deleteTransaction(portfolioName: string, txId: string) {
  return api.delete(portfolioEndpoints.txDelete(portfolioName, txId));
}

export async function createTransaction(portfolioName: string, payload: CreateTxApi) {
  return api.post(portfolioEndpoints.txCreate(portfolioName), {
    action: ACTIONS.add,
    payload,
  });
}
