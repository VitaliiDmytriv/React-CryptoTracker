import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { formatMoney } from "@/lib/format";
import type { TransactionWithCoin } from "@/types/global";
import Decimal from "decimal.js";
import { preventNonNumericInput } from "../../utils/helpFunctions";
import { cn } from "@/lib/utils";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Props = {
  transaction: TransactionWithCoin;
};

export function SplitTxForm({ transaction }: Props) {
  const total = new Decimal(transaction.quantity);

  const [splitAmount, setSplitAmount] = useState(() => total.div(2));
  const [splitInputValue, setSplitInputValue] = useState(() => splitAmount.toString());
  const [sellPrice, setSellPrice] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const steps = [0, 25, 50, 75, 100];

  const originalAmount = total.minus(splitAmount);

  const minThreshold = total.mul(0.01);
  const maxThreshold = total.mul(0.99);

  const totalSpentOriginal = total.minus(splitAmount).mul(transaction.pricePerCoinBought);
  const totalSpentSplit = splitAmount.mul(transaction.pricePerCoinBought);
  const totalProfit = calculateProfit();
  const percent = splitAmount.div(total).mul(100).toFixed(0);

  function onSliderChange(value: number[]) {
    setIsDragging(true); // почали тягнути
    const val = new Decimal(value[0]);
    setSplitAmount(val);
    setSplitInputValue(val.toString());
  }

  function onSplitInputBlur() {
    const safeInput = splitInputValue === "" ? "0" : splitInputValue;
    const inputVal = new Decimal(safeInput);

    const clampedVal = Decimal.max(minThreshold, Decimal.min(maxThreshold, inputVal));
    setSplitAmount(clampedVal);
    setSplitInputValue(clampedVal.toString());
  }

  function calculateProfit() {
    if (!sellPrice) return null;
    return splitAmount.mul(sellPrice).minus(totalSpentSplit).toString();
  }

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-1 gap-y-2 items-center">
          <div className="col-span-full py-4 relative">
            <div className="absolute flex justify-between w-full top-1/2 -translate-y-1/2 left-0">
              {steps.map((step) => {
                const stepValue = total.mul(step).div(100);
                const isPassed = splitAmount.gte(stepValue);
                return (
                  <div
                    key={step}
                    className={cn(
                      "block h-[.625rem] w-[.625rem] bg-[#cecece] z-10",
                      isPassed ? "bg-primary" : "bg-[#cecece]",
                    )}
                  ></div>
                );
              })}
            </div>
            <Root
              step={total.div(100).toNumber()}
              min={minThreshold.toNumber()}
              max={maxThreshold.toNumber()}
              value={[splitAmount.toNumber()]}
              onValueChange={onSliderChange}
              onValueCommit={() => setIsDragging(false)}
              onBlur={() => setIsDragging(false)}
              className="relative flex w-full touch-none select-none items-center"
            >
              <Track className="relative h-1 w-full border-0 grow  rounded-full bg-[#cecece]">
                <Range className="absolute h-[.29rem] -bottom-[.3px] bg-primary" />
              </Track>
              <Tooltip open={isDragging}>
                <TooltipTrigger asChild>
                  <Thumb className="block h-3.5 w-3.5 border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>{percent}%</TooltipContent>
              </Tooltip>
            </Root>
          </div>
          <Field>
            <FieldLabel>Original</FieldLabel>
            <Input
              value={originalAmount.toString()}
              readOnly
              className="focus-visible:ring-0 cursor-auto"
            />
          </Field>

          <Field>
            <FieldLabel>New</FieldLabel>
            <Input
              type="number"
              step="any"
              inputMode="decimal"
              onKeyDown={preventNonNumericInput}
              onChange={(e) => setSplitInputValue(e.target.value)}
              onBlur={onSplitInputBlur}
              value={splitInputValue}
            />
          </Field>

          <Field className="gap-0">
            <FieldLabel>Total spent</FieldLabel>
            <div>{formatMoney(totalSpentOriginal.toString())}</div>
          </Field>

          <Field className="flex flex-row">
            <div>
              <FieldLabel>Total spent</FieldLabel>
              <div>{formatMoney(totalSpentSplit.toString())}</div>
            </div>
            <div>
              <FieldLabel>Profit</FieldLabel>
              <div>{formatMoney(totalProfit)}</div>
            </div>
          </Field>

          <Field className="col-start-2">
            <FieldLabel>Sell price</FieldLabel>
            <Input
              type="number"
              step="any"
              inputMode="decimal"
              onKeyDown={preventNonNumericInput}
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </Field>
        </div>
      </div>
      <div>
        <Button className="w-full">Split</Button>
      </div>
    </div>
  );
}
