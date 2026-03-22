import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function MetricTooltip({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="p-[2px] text-tertiary w-5 h-5 rounded-[2px] data-[state=open]:bg-foreground/15 hover:bg-foreground/15 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="bg-background border-border border-[1px]" sideOffset={10}>
        <div className="text-xs">{children}</div>
      </PopoverContent>
    </Popover>
  );
}
