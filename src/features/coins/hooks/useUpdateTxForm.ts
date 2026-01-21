import type { TransactionWithCoin } from "@/types/global";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updTxSchema, type updTxForm } from "../utils/transaction.schema";
import { useTransactions } from "./useTransactions";
import { transactionApiToForm } from "../utils/transaction.adapter";

type Props = {
  initialData: TransactionWithCoin;
};

export function useUpdateTxForm({ initialData }: Props) {
  const form = useForm<updTxForm>({
    defaultValues: transactionApiToForm(initialData, "edit"),
    resolver: zodResolver(updTxSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { updateMutation } = useTransactions();

  const onSubmit = async (data: updTxForm) => {
    await updateMutation.mutateAsync({ txId: initialData.id, payload: data });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    actionMutation: updateMutation,
  };
}

export type useUpdateTxFromType = typeof useUpdateTxForm;
