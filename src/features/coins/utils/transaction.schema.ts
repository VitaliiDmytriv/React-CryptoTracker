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
  return (
    z
      .union([z.literal(""), z.string()])
      // .transform((val) => (val === "" ? "" : val))
      .refine((val) => {
        if (val === "") return true;
        try {
          return new Decimal(val).gt(0);
        } catch {
          return false;
        }
      }, "Must be a positive number")
  );
}

export const updTxSchema = z.object({
  quantity: zRequiredDecimalString(),
  pricePerCoinBought: zRequiredDecimalString(),
  pricePerCoinSold: zOptionalDecimalString(),
  fees: zOptionalDecimalString(),
  date: z.string().date(),
});

export type updTxForm = z.input<typeof updTxSchema>;

export const createTxSchema = z.object({
  quantity: zRequiredDecimalString(),
  pricePerCoinBought: zRequiredDecimalString(),
  pricePerCoinSold: zOptionalDecimalString(),
  fees: zOptionalDecimalString(),
  date: z.string().date(),
  name: z.string(),
});

export type createTxForm = z.input<typeof createTxSchema>;
