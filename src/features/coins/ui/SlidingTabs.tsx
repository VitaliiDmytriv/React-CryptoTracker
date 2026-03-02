import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  viewFirst: string;
  viewSecond: string;
};

export function SlidingTabs({ children, viewFirst, viewSecond }: Props) {
  const [switcher, setSwitcher] = useState(false);
  return (
    <div className="overflow-hidden w-full">
      {/* Окремий компонент */}
      <div className="flex border dark:bg-foreground/[.01] rounded-sm text-center cursor-pointer relative mb-2">
        <div
          className={cn(
            "absolute top-0 bottom-0 w-1/2 bg-primary transition-transform duration-300 ease-in-out rounded-sm",
            switcher && "translate-x-full",
          )}
        ></div>
        <div
          onClick={() => setSwitcher(false)}
          className={cn(
            "flex-1 z-10 transition-colors duration-100",
            !switcher && "text-background",
          )}
        >
          {viewFirst}
        </div>
        <div
          onClick={() => setSwitcher(true)}
          className={cn(
            "flex-1 z-10 transition-colors duration-100",
            switcher && "text-background",
          )}
        >
          {viewSecond}
        </div>
      </div>

      <div
        className={cn(
          "flex w-[200%] gap-1 transition-transform duration-300 ease-in-out",
          switcher ? "-translate-x-[calc(50%+2px)]" : "translate-x-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
