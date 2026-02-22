import type { RouteParams } from "@/types/global";
import * as txServise from "../api/transactions.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioKeys } from "@/lib/queryKeys";
import type { TxForm, txSplited } from "../utils/transaction.schema";
import type { CreateTxApi } from "../utils/transaction.adapter";
import { useNavigate } from "react-router-dom";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import { useMergeTxStore } from "@/store/useMergeTxStore";
import type { AxiosError } from "axios";
import { toast } from "sonner";

type UpdateTxProps = {
  txId: string;
  payload: TxForm;
};

export type MergeTxProps = {
  ids: string[];
  mergedTx: TxForm & { symbol: string };
};

export type SplitTxProps = {
  txId: string;
  originalAmount: string;
  splited: txSplited;
};

export function useTransactions() {
  const { portfolioName } = useParams<RouteParams>();
  const closeDialog = useTxDialogStore((s) => s.close);
  const closeMerge = useMergeTxStore((s) => s.closeMerge);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: ({ txId, payload }: UpdateTxProps) => {
      if (!portfolioName) throw new Error("Missing params");
      return txServise.updateTransaction(portfolioName, txId, payload);
    },
    onSuccess: () => {
      setTimeout(() => {
        closeDialog();
      }, 1150);

      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (txId: string) => {
      if (!portfolioName) throw new Error("Missing params");
      return txServise.deleteTransaction(portfolioName, txId);
    },
    onSuccess: (response) => {
      if (response.isCoinDeleted) {
        navigate(`/dashboard/${portfolioName}`);
      }
      setTimeout(() => {
        closeDialog();
        queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
      }, 1150);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateTxApi) => {
      console.log(portfolioName);

      if (!portfolioName) throw new Error("Missing params");
      return txServise.createTransaction(portfolioName, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
      setTimeout(() => {
        closeDialog();
        navigate(`/dashboard/${portfolioName}/coins/${variables.coin.symbol.toUpperCase()}`);
      }, 1150);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  const mergeMutation = useMutation({
    mutationFn: (payload: MergeTxProps) => {
      if (!portfolioName) throw new Error("Missing params");
      return txServise.mergeTransaction(portfolioName, payload);
    },
    onSuccess: () => {
      closeMerge();
      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
      setTimeout(() => {
        closeDialog();
      }, 1150);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  const splitMutation = useMutation({
    mutationFn: (payload: SplitTxProps) => {
      if (!portfolioName) throw new Error("Missing params");
      return txServise.splitTransaction(portfolioName, payload);
    },
    onSuccess: () => {
      closeMerge();
      queryClient.invalidateQueries({ queryKey: portfolioKeys.byName(portfolioName!) });
      setTimeout(() => {
        closeDialog();
      }, 1150);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  return {
    updateMutation,
    deleteMutation,
    createMutation,
    mergeMutation,
    splitMutation,
  };
}
