import type { OnSuccesFc, TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useUpdateTxForm } from "../hooks/useUpdateTxForm";

type Props = {
  initialData: TransactionWithCoin;
  onSuccess: OnSuccesFc;
};

export function EditTxContainer({ initialData, onSuccess }: Props) {
  const { form, onSubmit, actionMutation, onDelete, deleteMutation } = useUpdateTxForm({
    initialData,
    onSuccess,
  });

  const isLoading = actionMutation.isPending || deleteMutation.isPending;
  const isSuccess = actionMutation.isSuccess || deleteMutation.isSuccess;

  return (
    <TransactionForm
      form={form}
      mode="edit"
      isLoading={isLoading}
      isSuccess={isSuccess}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
}
