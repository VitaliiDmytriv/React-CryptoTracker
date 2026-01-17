import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTxSchema, type createTxInputForm } from "../utils/transaction.schema";
import { useTransactions } from "./useTransactions";

type Props = {
  initialData: createTxInputForm;
};

export function useCreateTxForm({ initialData }: Props) {
  const form = useForm<createTxInputForm>({
    defaultValues: initialData,
    resolver: zodResolver(createTxSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { updateMutation } = useTransactions();

  const onSubmit = (data: createTxInputForm) => {
    const parsed = createTxSchema.parse(data);
    console.log(parsed);

    // const txApi = transactionUpdFormToApi(parsed);
    // updateMutation.mutate({ txId: initialData.id, payload: txApi });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    actionMutation: updateMutation,
  };
}

export type useCreateTxFromType = typeof useCreateTxForm;
