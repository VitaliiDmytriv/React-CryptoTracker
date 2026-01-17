import { z } from "zod";

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

export const updTxSchema = z.object({
  quantity: zRequiredNumber(),
  pricePerCoinBought: zRequiredNumber(),
  pricePerCoinSold: zOptionalNumber(),
  fees: zOptionalNumber(),
  date: z.string().date(),
});

export type updTxInputForm = z.input<typeof updTxSchema>;
export type updTxOutputForm = z.output<typeof updTxSchema>;

export const createTxSchema = z.object({
  quantity: zRequiredNumber(),
  pricePerCoinBought: zRequiredNumber(),
  pricePerCoinSold: zOptionalNumber(),
  fees: zOptionalNumber(),
  date: z.string().date(),
  name: z.string(),
  // symbol: z.string(),
  // image: z.string(),
});

export type createTxInputForm = z.input<typeof createTxSchema>;
export type createTxOutputForm = z.output<typeof createTxSchema>;
