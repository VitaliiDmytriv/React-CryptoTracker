import { z } from "zod";
import Decimal from "decimal.js";

function zRequiredDecimalString() {
  return z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine((val) => {
      try {
        const dcValue = new Decimal(val);
        return dcValue.gt(0);
      } catch {
        return false;
      }
    }, "Must be a positive number");
}

function zOptionalDecimalString() {
  return z
    .union([z.literal(""), z.string()])
    .transform((val) => (val === "" ? null : val))
    .refine((val) => {
      if (val === null) return true;
      try {
        return new Decimal(val).gt(0);
      } catch {
        return false;
      }
    }, "Must be a positive number");
}

export const updTxSchema = z.object({
  action: z.literal("edit"),
  payload: z.object({
    name: z.string().min(1),
    quantity: zRequiredDecimalString(),
    pricePerCoinBought: zRequiredDecimalString(),
    pricePerCoinSold: zOptionalDecimalString(),
    fees: zOptionalDecimalString(),
    date: z.string().date(),
  }),
});

export const createTxSchema = z.object({
  action: z.literal("add"),
  payload: z.object({
    quantity: zRequiredDecimalString(),
    pricePerCoinBought: zRequiredDecimalString(),
    pricePerCoinSold: zOptionalDecimalString(),
    fees: zOptionalDecimalString(),
    date: z.string().date(),
    coin: z.object({
      name: z.string().min(1),
      image: z.string().min(1),
      symbol: z.string().min(1),
    }),
  }),
});

export const mergeTxSchema = z.object({
  action: z.literal("merge"),
  payload: z.object({
    ids: z.array(z.string()).min(2, "It should be at least two tx"),
    mergedTx: z.object({
      name: z.string().min(1),
      quantity: zRequiredDecimalString(),
      pricePerCoinBought: zRequiredDecimalString(),
      pricePerCoinSold: zOptionalDecimalString(),
      fees: zOptionalDecimalString(),
      date: z.string().date(),
      symbol: z.string(),
    }),
  }),
});

export const splitTxSchema = z.object({
  action: z.literal("split"),
  payload: z.object({
    originalAmount: zRequiredDecimalString(),
    txId: z.string(),
    splited: z.object({
      quantity: zRequiredDecimalString(),
      pricePerCoinSold: zOptionalDecimalString(),
    }),
  }),
});

export type updTxApi = z.input<typeof updTxSchema>;
export type createTxApi = z.input<typeof createTxSchema>;
export type mergeTxApi = z.input<typeof mergeTxSchema>;
export type splitTxApi = z.input<typeof splitTxSchema>;
