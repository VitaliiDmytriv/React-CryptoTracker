import type { AnimateFc, OnErrorFc, OnSuccesFc, RouteParams } from "@/types/global";
import * as txServise from "../api/transactions.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioKeys } from "@/lib/queryKeys";
import type { TxForm } from "../utils/transaction.schema";
import type { CreateTxApi } from "../utils/transaction.adapter";

type useTxProps = {
  onSuccess?: OnSuccesFc;
  onAnimate?: AnimateFc;
  onError?: OnErrorFc;
};

type UpdateTxProps = {
  txId: string;
  payload: TxForm;
};

export function useTransactions(actions: useTxProps) {
  const { portfolioName, symbol } = useParams<RouteParams>();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ txId, payload }: UpdateTxProps) => {
      if (!portfolioName || !symbol) throw new Error("Missing params");
      return txServise.updateTransaction(portfolioName, symbol, txId, payload);
    },
    onSuccess: () => {
      setTimeout(() => {
        actions?.onSuccess?.();
      }, 1150);

      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (txId: string) => {
      if (!portfolioName || !symbol) throw new Error("Missing params");
      return txServise.deleteTransaction(portfolioName, symbol, txId);
    },
    onSuccess: (response) => {
      console.log(response.data);

      setTimeout(() => {
        actions?.onSuccess?.();
      }, 1150);

      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateTxApi) => {
      if (!portfolioName) throw new Error("Missing params");
      return txServise.createTransaction(portfolioName, payload);
    },
    onSuccess: () => {
      setTimeout(() => {
        actions?.onSuccess?.();
      }, 1150);
    },
  });

  return {
    updateMutation,
    deleteMutation,
    createMutation,
  };
}
