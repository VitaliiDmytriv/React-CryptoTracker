import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type Props = {
  title: string;
  count: string;
  isLoading: boolean;
  className?: string;
};

export function StatsBlock({ title, count, isLoading, className }: Props) {
  return (
    <div className={cn("border rounded-md shadow-around p-4 w-32 shrink-0", className)}>
      <div className="text-tertiary text-[.625rem] sm:text-xs mb-2">{title}</div>
      <div className="text-xs md:text-base">
        {isLoading ? <Skeleton className="w-full h-4 md:h-6" /> : <b>{count}</b>}
      </div>
    </div>
  );
}
