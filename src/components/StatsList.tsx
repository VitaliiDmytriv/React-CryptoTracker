import { StatsBlock } from "./StatsBlock";
import { formatMoney, formatPrice } from "@/lib/format";

type Props = {
  data:
    | {
        activeInvestment: string;
        totalProfit: string;
        avgPrice?: string;
      }
    | undefined;
  showAvgPrice: boolean;
  isLoading: boolean;
};

export function StatsList({ data, isLoading, showAvgPrice }: Props) {
  return (
    <div className="flex gap-3 py-3 ">
      <StatsBlock
        isLoading={isLoading}
        title="Cost Basis"
        count={data ? formatMoney(data.activeInvestment) : ""}
      />
      <StatsBlock
        isLoading={isLoading}
        title="All-time Profit"
        count={data ? formatMoney(data.totalProfit) : ""}
      />
      {showAvgPrice && (
        <StatsBlock
          isLoading={isLoading}
          title="Avg Price"
          count={data ? formatPrice(data?.avgPrice ? data.avgPrice : null) : ""}
          className="hidden sm:block"
        />
      )}
    </div>
  );
}
