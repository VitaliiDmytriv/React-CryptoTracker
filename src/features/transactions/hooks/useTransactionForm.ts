import type { Transaction } from "@/types/global";
import { useForm } from "react-hook-form";

export function useTransactionForm(initialData: Transaction) {
  const form = useForm<Transaction>({ defaultValues: initialData });

  const onSubmit = (data: Transaction) => {
    console.log(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
