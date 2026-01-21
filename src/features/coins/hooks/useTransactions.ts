import type { RouteParams } from "@/types/global";
import * as txServise from "../api/transactions.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioKeys } from "@/lib/queryKeys";
import type { updTxForm } from "../utils/transaction.schema";

type UpdateTxProps = {
  txId: string;
  payload: updTxForm;
};

export function useTransactions() {
  const { portfolioName, symbol } = useParams<RouteParams>();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ txId, payload }: UpdateTxProps) => {
      if (!portfolioName || !symbol) throw new Error("Missing params");
      return txServise.updateTransaction(portfolioName, symbol, txId, payload);
    },
    onSuccess: (dataFromServer: unknown) => {
      console.log(dataFromServer);

      queryClient.invalidateQueries({ queryKey: portfolioKeys.coin(portfolioName!, symbol!) });
    },
  });

  return {
    updateMutation,
  };
}
