import { cn } from "@/lib/utils";
import type Decimal from "decimal.js";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  value: Decimal;
  children: React.ReactNode;
  showIcon: boolean;
};

export function PnLIndicator({ value, children, showIcon }: Props) {
  const isPositive = value.greaterThan(0);
  const isZero = value.isZero();

  return (
    <div
      className={cn(
        "text-xs md:text-sm flex items-center [&_svg]:h-4 [&_svg]:w-4",
        isPositive ? "text-positive" : isZero ? "" : "text-negative",
      )}
    >
      {showIcon && (isPositive ? <ChevronUp /> : isZero ? null : <ChevronDown />)}
      {children}
    </div>
  );
}
