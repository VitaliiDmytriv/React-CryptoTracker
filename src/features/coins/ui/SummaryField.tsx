import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/format";
import Decimal from "decimal.js";
import { useWatch, type Control } from "react-hook-form";
import type { TxForm } from "../utils/transaction.schema";

type Mode = "spent" | "profit";

type Props = {
  control: Control<TxForm>;
  mode: Mode;
};

const titles: Record<Mode, string> = {
  spent: "Total spent",
  profit: "Profit",
};

export function SummaryField({ control, mode }: Props) {
  const title = titles[mode];
  const [quantity, pricePerCoinBought, fees, pricePerCoinSold] = useWatch({
    control,
    name: ["quantity", "pricePerCoinBought", "fees", "pricePerCoinSold"],
  });

  function calculateResult() {
    if (!quantity && !pricePerCoinBought) return null;
    try {
      const spent = new Decimal(quantity).mul(pricePerCoinBought).toString();
      if (mode === "spent") return spent;

      if (!pricePerCoinSold) return null;
      const fee = fees || "0";
      return new Decimal(pricePerCoinSold).mul(quantity).minus(spent).minus(fee).toString();
    } catch {
      return null;
    }
  }
  const result = calculateResult();

  return (
    <Field className="gap-1 sm:gap-2">
      <FieldLabel>{title}</FieldLabel>
      <Input value={formatMoney(result)} className="focus-visible:ring-0 cursor-auto" readOnly />
    </Field>
  );
}
