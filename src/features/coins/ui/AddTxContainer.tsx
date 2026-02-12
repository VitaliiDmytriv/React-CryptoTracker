import type { TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useAddTxForm } from "../hooks/useAddTxForm";

type Props = {
  initialData: TransactionWithCoin;
};

export function AddTxContainer({ initialData }: Props) {
  const { form, onSubmit, actionMutation, onSelectCoin } = useAddTxForm({
    initialData,
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
