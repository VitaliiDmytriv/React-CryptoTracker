import type { AnimateFc, OnErrorFc, OnSuccesFc, RouteParams } from "@/types/global";
import * as txServise from "../api/transactions.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioKeys } from "@/lib/queryKeys";
import type { TxForm } from "../utils/transaction.schema";
import type { CreateTxApi } from "../utils/transaction.adapter";
import { useNavigate } from "react-router-dom";

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
  const { portfolioName } = useParams<RouteParams>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: ({ txId, payload }: UpdateTxProps) => {
      if (!portfolioName) throw new Error("Missing params");
      return txServise.updateTransaction(portfolioName, txId, payload);
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
      if (!portfolioName) throw new Error("Missing params");
      return txServise.deleteTransaction(portfolioName, txId);
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
      setTimeout(() => {
        actions?.onSuccess?.();
        navigate(`/dashboard/${portfolioName}/coins/${variables.coin.symbol.toUpperCase()}`);
      }, 1150);
    },
  });

  return {
    updateMutation,
    deleteMutation,
    createMutation,
  };
}
