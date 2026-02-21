import type { TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useUpdateTxForm } from "../hooks/useUpdateTxForm";
import { SplitTxForm } from "./form/SplitTxForm";
import { SlidingTabs } from "./SlidingTabs";

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
    <SlidingTabs viewFirst="Edit" viewSecond="Split">
      <div className="w-1/2 p-1">
        <TransactionForm
          form={form}
          mode="edit"
          isLoading={isLoading}
          isSuccess={isSuccess}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      </div>
      <div className="w-1/2 p-1">
        <SplitTxForm transaction={initialData} />
      </div>
    </SlidingTabs>
  );
}
