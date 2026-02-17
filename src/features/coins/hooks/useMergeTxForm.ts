import type { TransactionWithCoin } from "@/types/global";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { txSchema, type TxForm } from "../utils/transaction.schema";
import { useTransactions } from "./useTransactions";
import { transactionApiToForm } from "../utils/transaction.adapter";
import { useMergeTxStore } from "@/store/useMergeTxStore";

type Props = {
  initialData: TransactionWithCoin;
};

export function useMergeTxForm({ initialData }: Props) {
  const form = useForm<TxForm>({
    defaultValues: transactionApiToForm(initialData),
    resolver: zodResolver(txSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const rowSelection = useMergeTxStore((s) => s.rowSelection);

  const { mergeMutation } = useTransactions();

  const onSubmit = async (data: TxForm) => {
    const ids = Object.keys(rowSelection);
    await mergeMutation.mutateAsync({
      ids,
      mergedTx: { ...data, symbol: initialData.coin.symbol },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    actionMutation: mergeMutation,
  };
}
