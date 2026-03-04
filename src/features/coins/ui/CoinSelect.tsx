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
import type { CoinGecko } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { coinsData } from "@/coinsGecko";

function fuzzyMatch(source: string, query: string) {
  if (!query) return true;

  let qi = 0;
  const q = query.toLowerCase();
  const s = source.toLowerCase();

  for (let i = 0; i < s.length && qi < q.length; i++) {
    if (s[i] === q[qi]) qi++;
  }

  return qi === q.length;
}

async function fetchCoins(search: string) {
  const q = search.trim().toLowerCase();

  if (!q) {
    return coinsData.slice(0, 50);
  }

  // await new Promise((res) => setTimeout(res, 0));

  return coinsData
    .filter((coin) => fuzzyMatch(coin.name, q) || fuzzyMatch(coin.symbol, q))
    .slice(0, 50); // обмеження результатів для продуктивності
}

type Props = {
  onSelectFn: (coin: CoinGecko) => void;
};

export function CoinSelect({ onSelectFn }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<CoinGecko | null>(null);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounceValue(query, 400);

  const { data: coins = [], isFetching } = useQuery<CoinGecko[]>({
    queryKey: ["coins", debouncedQuery],
    queryFn: () => fetchCoins(debouncedQuery),
    staleTime: 1000 * 30,
  });

  function onSelect(coin: CoinGecko) {
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
