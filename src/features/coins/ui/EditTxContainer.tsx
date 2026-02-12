import type { TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useUpdateTxForm } from "../hooks/useUpdateTxForm";

type Props = {
  initialData: TransactionWithCoin;
};

export function EditTxContainer({ initialData }: Props) {
  const { form, onSubmit, actionMutation, onDelete, deleteMutation } = useUpdateTxForm({
    initialData,
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
