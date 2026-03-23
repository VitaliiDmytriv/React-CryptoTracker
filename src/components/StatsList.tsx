import type { StatItem } from "@/types/global";
import { StatsBlock } from "./StatsBlock";
import { MetricTooltip } from "./shared/MetricTooltip";

type Props = {
  stats: StatItem[];
};

export function StatsList({ stats }: Props) {
  return (
    <div>
      <div className="md:hidden">
        <StatsBlock>
          <div className="flex flex-col gap-y-4 w-fit">
            {stats.map(({ content, label, tooltip }) => (
              <div key={label} className="flex gap-3 ">
                <div className="flex items-center gap-1 min-w-32 justify-between">
                  <span className="text-tertiary text-sm">{label}</span>
                  {tooltip && <MetricTooltip>{tooltip}</MetricTooltip>}
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
              {tooltip && <MetricTooltip>{tooltip}</MetricTooltip>}
            </div>
            <div className="text-xs md:text-base">{content}</div>
          </StatsBlock>
        ))}
      </div>
    </div>
  );
}
