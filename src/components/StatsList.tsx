import { formatMoney, formatPercent } from "@/lib/format";
import { Skeleton } from "./ui/skeleton";
import Decimal from "decimal.js";
import { StatsBlock } from "./StatsBlock";
import { PnLIndicator } from "./shared/PnLIndicator";
import { MetricTooltip } from "./shared/MetricTooltip";

type MetricsData = {
  totalPnL: string;
  marketValue: string;
  costBasis: string;
  totalPnLPercent: string;
  unrealizedPnL: string;
};

type Props = {
  data: MetricsData | undefined;
  isLoading: boolean;
};

export function StatsList({ data, isLoading }: Props) {
  const totalPnL = new Decimal(data?.totalPnL ?? "0");
  const unrealizedPnL = new Decimal(data?.unrealizedPnL ?? "0");
  const totalPnLPercent = new Decimal(data?.totalPnLPercent ?? "0");

  const stats = [
    {
      label: "All-time profit",
      tooltip: (
        <>
          <div className="text-foreground font-bold mb-1">How is it calculated?</div>
          <div className="text-tertiary">
            <h4 className="mb-1">All-time Profit = Unrealized + Realized</h4>
            <ul className="pl-4 list-disc">
              <li>Unrealized — current market value minus what you paid</li>
              <li>Realized — profit or loss already locked in from your past sales</li>
            </ul>
          </div>
        </>
      ),
      content: isLoading ? (
        <Skeleton className="w-full h-4 md:h-6" />
      ) : (
        <div className="flex flex-col">
          <PnLIndicator showIcon={false} value={totalPnL}>
            <b className="text-base md:text-lg">{formatMoney(data!.totalPnL)}</b>
          </PnLIndicator>
          <PnLIndicator showIcon={true} value={totalPnLPercent}>
            {formatPercent(data!.totalPnLPercent)}
          </PnLIndicator>
        </div>
      ),
    },
    {
      label: "Cost Basis",
      tooltip: (
        <>
          <h4 className="text-foreground font-bold mb-1">How is it calculated?</h4>
          <div className="text-tertiary">
            Total cost of your current holdings. <br /> Calculated as (Avg. Buy Price &times;
            Quantity)
          </div>
        </>
      ),
      content: isLoading ? (
        <Skeleton className="w-full h-4 md:h-6" />
      ) : (
        <b className="text-base md:text-lg">{formatMoney(data!.costBasis)}</b>
      ),
    },
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
  ];

  return (
    <div>
      <div className="md:hidden">
        <StatsBlock>
          <div className="flex flex-col gap-y-4 w-fit">
            {stats.map(({ content, label, tooltip }) => (
              <div key={label} className="flex gap-3 ">
                <div className="flex items-center gap-1 min-w-32 justify-between">
                  <span className="text-tertiary text-sm">{label}</span>
                  <MetricTooltip>{tooltip}</MetricTooltip>
                </div>
                <div className="text-xs md:text-base">{content}</div>
              </div>
            ))}
          </div>
        </StatsBlock>
      </div>

      <div className="gap-3 py-3 hidden md:flex">
        {stats.map(({ label, tooltip, content }) => (
          <StatsBlock key={label}>
            <div className="text-tertiary text-sm mb-1 flex items-center justify-between">
              <span>{label}</span>
              <MetricTooltip>{tooltip}</MetricTooltip>
            </div>
            <div className="text-xs md:text-base">{content}</div>
          </StatsBlock>
        ))}
      </div>
    </div>
  );
}
