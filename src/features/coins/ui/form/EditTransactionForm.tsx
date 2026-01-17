import type { TransactionWithCoin } from "@/types/global";
import { DefaultForm } from "./DefaultForm";
import { useUpdateTxFrom } from "../../hooks/useUpdateTxFrom";

type Props = {
  initialData: TransactionWithCoin;
};

export function EditTransactionForm({ initialData }: Props) {
  const { form, onSubmit } = useUpdateTxFrom({ initialData });

  return <DefaultForm form={form} onSubmit={onSubmit} />;
}
