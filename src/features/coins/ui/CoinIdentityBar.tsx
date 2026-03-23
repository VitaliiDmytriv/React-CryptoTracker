import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CointItem } from "./CoinItem";
import { Skeleton } from "@/components/ui/skeleton";
import type { Coin, TransactionWithCoin } from "@/types/global";

type Props = {
  coin: Coin<TransactionWithCoin> | null;
};

export function CoinIdentityBar({ coin }: Props) {
  return (
    <div className="my-2">
      {coin ? (
        <div className="flex gap-2 sm:gap-4">
          <Button variant={"link"} className="p-1 h-auto" asChild>
            <Link to={"/dashboard/main"}>
              <ChevronLeft size="20" stroke-width="1.5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </Button>
          <CointItem image={coin.image} name={coin.name} symbol={coin.symbol} />
        </div>
      ) : (
        <Skeleton className="h-6 sm:h-7 w-48" />
      )}
    </div>
  );
}
