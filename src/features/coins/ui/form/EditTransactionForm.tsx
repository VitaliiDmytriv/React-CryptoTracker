import type { TransactionWithCoin } from "@/types/global";
import { DefaultForm } from "./DefaultForm";
import { useUpdateTxForm } from "../../hooks/useUpdateTxForm";

type Props = {
  initialData: TransactionWithCoin;
};

export function EditTransactionForm({ initialData }: Props) {
  const { form, onSubmit } = useUpdateTxForm({ initialData });

  return <DefaultForm form={form} onSubmit={onSubmit} mode="edit" />;
}
