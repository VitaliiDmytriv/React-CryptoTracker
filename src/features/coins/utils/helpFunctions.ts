import Decimal from "decimal.js";
import { txSplitedSchema, type txSplited } from "./transaction.schema";
import { ZodError } from "zod";

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function preventNonNumericInput(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "-" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
}

export function validateSplitTxs(
  originalAmount: string,
  splited: txSplited,
  totalQuantity: string,
) {
  txSplitedSchema.parse(splited);
  const difference = new Decimal(originalAmount).add(splited.quantity);
  if (difference.toString() !== totalQuantity) throw new Error("Quantity is not matched");
}

export function safeValidateSplitTxs(
  originalAmount: string,
  splited: txSplited,
  totalQuantity: string,
) {
  try {
    validateSplitTxs(originalAmount, splited, totalQuantity);
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message ?? "Validation error",
      };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "Unexpected error" };
  }
}
