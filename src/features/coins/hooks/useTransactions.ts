import type { AnimateFc, OnErrorFc, OnSuccesFc, RouteParams } from "@/types/global";
import * as txServise from "../api/transactions.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioKeys } from "@/lib/queryKeys";
import type { updTxForm } from "../utils/transaction.schema";

type useTxProps = {
  onSuccess?: OnSuccesFc;
  onAnimate?: AnimateFc;
  onError?: OnErrorFc;
};

type UpdateTxProps = {
  txId: string;
  payload: updTxForm;
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

  return {
    updateMutation,
    deleteMutation,
  };
}
