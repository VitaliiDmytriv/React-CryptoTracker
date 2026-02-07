import type { OnSuccesFc, TransactionWithCoin } from "@/types/global";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { txSchema, type TxForm } from "../utils/transaction.schema";
import { useTransactions } from "./useTransactions";
import { transactionApiToForm } from "../utils/transaction.adapter";

type Props = {
  initialData: TransactionWithCoin;
  onSuccess: OnSuccesFc;
};

export function useUpdateTxForm({ initialData, onSuccess }: Props) {
  const form = useForm<TxForm>({
    defaultValues: transactionApiToForm(initialData),
    resolver: zodResolver(txSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { updateMutation, deleteMutation } = useTransactions({ onSuccess });

  const onSubmit = async (data: TxForm) => {
    await updateMutation.mutateAsync({ txId: initialData.id, payload: data });
  };

  const onDelete = async () => {
    await deleteMutation.mutateAsync(initialData.id);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    actionMutation: updateMutation,
    deleteMutation,
    onDelete,
  };
}

export type useUpdateTxFromType = typeof useUpdateTxForm;
