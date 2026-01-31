import type { OnSuccesFc, TransactionWithCoin } from "@/types/global";
import { DefaultForm } from "./DefaultForm";
import { useUpdateTxForm } from "../../hooks/useUpdateTxForm";

type Props = {
  initialData: TransactionWithCoin;
  onSuccess: OnSuccesFc;
};

export function EditTransactionForm({ initialData, onSuccess }: Props) {
  const { form, onSubmit, actionMutation, onDelete, deleteMutation } = useUpdateTxForm({
    initialData,
    onSuccess,
  });

  const isLoading = actionMutation.isPending || deleteMutation.isPending;
  const isSuccess = actionMutation.isSuccess || deleteMutation.isSuccess;

  return (
    <DefaultForm
      form={form}
      onSubmit={onSubmit}
      mode="edit"
      isLoading={isLoading}
      isSuccess={isSuccess}
      onDelete={onDelete}
    />
  );
}
