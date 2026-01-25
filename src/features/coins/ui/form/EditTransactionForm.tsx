import type { OnSuccesFc, TransactionWithCoin } from "@/types/global";
import { DefaultForm } from "./DefaultForm";
import { useUpdateTxForm } from "../../hooks/useUpdateTxForm";

type Props = {
  initialData: TransactionWithCoin;
  onSuccess: OnSuccesFc;
};

export function EditTransactionForm({ initialData, onSuccess }: Props) {
  const { form, onSubmit, actionMutation } = useUpdateTxForm({ initialData, onSuccess });

  return (
    <DefaultForm
      form={form}
      onSubmit={onSubmit}
      mode="edit"
      isLoading={actionMutation.isPending}
      isSuccess={actionMutation.isSuccess}
    />
  );
}
