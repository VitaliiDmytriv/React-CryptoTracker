import type { Transaction } from "@/types/global";
import { useForm } from "react-hook-form";
import { transactionToForm, txForm, type TxInputFormValues } from "../utils/transaction.adapter";

import { zodResolver } from "@hookform/resolvers/zod";

export function useTransactionForm(initialData: Transaction) {
  const form = useForm<TxInputFormValues>({
    defaultValues: transactionToForm(initialData),
    resolver: zodResolver(txForm),
    mode: "onBlur",
  });

  const onSubmit = (data: TxInputFormValues) => {
    const parsed = txForm.parse(data);
    console.log(parsed);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
