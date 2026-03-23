import type { StatItem } from "@/types/global";
import { PnLIndicator } from "@/components/shared/PnLIndicator";
import Decimal from "decimal.js";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney, formatPrice } from "@/lib/format";

type MetricsData = {
  marketValue: string;
  quantity: string;
  realizedPnL: string;
  avgBuyPrice: string;
  unrealizedPnL: string;
};

export function useCoinStats(data: MetricsData | null, isLoading: boolean): StatItem[] {
  const unrealizedPnL = new Decimal(data?.unrealizedPnL ?? "0");
  const realizedPnL = new Decimal(data?.realizedPnL ?? "0");

  return [
    {
      label: "Market Value",
      tooltip: (
        <>
          <h4 className="text-foreground font-bold mb-1">How is it calculated?</h4>
          <div className="text-tertiary">
            Current market value of your holdings <br /> Current price &times; quantity
          </div>
        </>
      ),
      content: isLoading ? (
        <Skeleton className="w-full h-4 md:h-6" />
      ) : (
        <div>
          <b className="text-base md:text-lg">{formatMoney(data!.marketValue)}</b>
          <PnLIndicator showIcon={false} value={unrealizedPnL}>
            {formatMoney(data!.unrealizedPnL)}
          </PnLIndicator>
        </div>
      ),
    },
    {
      label: "Avg. buy price",
      tooltip: null,
      content: isLoading ? (
        <Skeleton className="w-full h-4 md:h-6" />
      ) : (
        <b className="text-base md:text-lg">{formatPrice(data!.avgBuyPrice)}</b>
      ),
    },
    {
      label: "Total profit / loss",
      tooltip: null,
      content: isLoading ? (
        <Skeleton className="w-full h-4 md:h-6" />
      ) : (
        <PnLIndicator showIcon={false} value={realizedPnL}>
          <b className="text-base md:text-lg">{formatMoney(data!.realizedPnL)}</b>
        </PnLIndicator>
      ),
    },
  ];
}
