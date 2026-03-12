import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CointItem } from "./CoinItem";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import type { CoinOption } from "../types/coin.types";
import { useGeckoCoins } from "../hooks/useGeckoCoin";

type Props = {
  onSelectFn: (coin: CoinOption) => void;
};

export function CoinSelect({ onSelectFn }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<CoinOption | null>(null);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounceValue(query, 400);

  const { data: coins = [], isFetching } = useGeckoCoins(debouncedQuery);

  function onSelect(coin: CoinOption) {
    setSelectedCoin(coin);
    setOpen(false);
    setQuery("");
    onSelectFn(coin);
  }

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center h-9 w-full rounded-md border border-input bg-transparent dark:bg-foreground/[.01] px-3 py-1 text-base shadow-sm transition-colors  md:text-sm">
          {!open &&
            (selectedCoin ? (
              <CointItem
                image={selectedCoin.image}
                name={selectedCoin.name}
                symbol={selectedCoin.symbol}
              />
            ) : (
              <span>Choose coin...</span>
            ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-[var(--radix-popover-trigger-width)] h-[calc(var(--radix-popover-content-available-height)_*_0.5)] ">
        <Command className="dark:bg-foreground/[.01]" shouldFilter={false}>
          <CommandInput value={query} onValueChange={setQuery} placeholder="Search coin..." />
          <CommandList>
            {isFetching && coins.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">Loading...</div>
            ) : coins.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              coins.map((coin) => (
                <CommandItem key={coin.id} value={coin.id} onSelect={() => onSelect(coin)}>
                  <CointItem image={coin.image} name={coin.name} symbol={coin.symbol} />
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
