import type { TransactionWithCoin } from "@/types/global";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updTxSchema, type updTxInputForm } from "../utils/transaction.schema";
import { useTransactions } from "./useTransactions";
import { transactionApiToForm, transactionUpdFormToApi } from "../utils/transaction.adapter";

type Props = {
  initialData: TransactionWithCoin;
};

export function useUpdateTxForm({ initialData }: Props) {
  const form = useForm<updTxInputForm>({
    defaultValues: transactionApiToForm(initialData, "edit"),
    resolver: zodResolver(updTxSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { updateMutation } = useTransactions();

  const onSubmit = async (data: updTxInputForm) => {
    const parsed = updTxSchema.parse(data);
    const txApi = transactionUpdFormToApi(parsed);
    await updateMutation.mutateAsync({ txId: initialData.id, payload: txApi });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    actionMutation: updateMutation,
  };
}

export type useUpdateTxFromType = typeof useUpdateTxForm;
