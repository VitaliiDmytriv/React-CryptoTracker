import { useState } from "react";
import type { CoinGecko, TransactionWithCoin } from "@/types/global";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { txSchema, type TxForm } from "../utils/transaction.schema";
import { useTransactions } from "./useTransactions";
import { mapTxToCreate, transactionApiToForm } from "../utils/transaction.adapter";

type Props = {
  initialData: TransactionWithCoin;
};

export function useAddTxForm({ initialData }: Props) {
  const form = useForm<TxForm>({
    defaultValues: transactionApiToForm(initialData),
    resolver: zodResolver(txSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { createMutation } = useTransactions();
  const [coinDetails, setCoinDetails] = useState({ name: "", symbol: "", image: "" });

  const onSelectCoin = (coin: CoinGecko) => {
    setCoinDetails({ name: coin.name, image: coin.image, symbol: coin.symbol });

    form.setValue("name", coin.name, {
      shouldValidate: true,
    });

    form.setValue("pricePerCoinBought", coin.current_price.toString());
  };

  async function onSubmit(data: TxForm) {
    const payload = mapTxToCreate(data, coinDetails);
    await createMutation.mutateAsync(payload);
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    onSelectCoin,
    actionMutation: createMutation,
  };
}

export type useAddTxFormType = typeof useAddTxForm;
