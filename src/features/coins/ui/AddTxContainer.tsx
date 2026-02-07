import type { OnSuccesFc, TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useAddTxForm } from "../hooks/useAddTxForm";

type Props = {
  initialData: TransactionWithCoin;
  onSuccess: OnSuccesFc;
};

export function AddTxContainer({ initialData, onSuccess }: Props) {
  const { form, onSubmit, actionMutation, onSelectCoin } = useAddTxForm({
    initialData,
    onSuccess,
  });

  return (
    <TransactionForm
      form={form}
      mode="add"
      isLoading={actionMutation.isPending}
      isSuccess={actionMutation.isSuccess}
      onSubmit={onSubmit}
      onSelectCoin={onSelectCoin}
    />
  );
}
