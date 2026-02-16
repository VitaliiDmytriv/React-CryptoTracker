import type { TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useMergeTxForm } from "../hooks/useMergeTxForm";
import { useMergedInitialData } from "../hooks/useMergedInitialDatat";

type Props = {
  initialData: TransactionWithCoin;
};

export function MergeTxContainer({ initialData }: Props) {
  const initialTx = useMergedInitialData(initialData);
  const { form, onSubmit, actionMutation } = useMergeTxForm({
    initialData: initialTx,
  });

  return (
    <TransactionForm
      form={form}
      mode="merge"
      isLoading={actionMutation.isPending}
      isSuccess={actionMutation.isSuccess}
      onSubmit={onSubmit}
    />
  );
}
