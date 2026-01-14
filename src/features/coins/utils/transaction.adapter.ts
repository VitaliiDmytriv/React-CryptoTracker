import type { Transaction } from "@/types/global";
import { z } from "zod";

export function transactionToForm(tx: Transaction): TxOutputFormValues {
  return {
    quantity: tx.quantity,
    pricePerCoinBought: tx.pricePerCoinBought,
    fees: tx.fees ?? "",
    pricePerCoinSold: tx.pricePerCoinSold ?? "",
    date: tx.date.split("T")[0],
  };
}

function zRequiredNumber() {
  return z
    .unknown()
    .refine((val) => val !== "" && val !== undefined && val !== null, {
      error: "This field is required",
    })
    .pipe(z.coerce.number().positive("Must be a positive number"));
}

function zOptionalNumber() {
  return z.union([z.literal(""), z.coerce.number().positive("Must be a positive number")]);
}

export const txForm = z.object({
  quantity: zRequiredNumber(),
  pricePerCoinBought: zRequiredNumber(),
  pricePerCoinSold: zOptionalNumber(),
  fees: zOptionalNumber(),
  date: z.string().date(),
});

export type TxInputFormValues = z.input<typeof txForm>;
export type TxOutputFormValues = z.output<typeof txForm>;
