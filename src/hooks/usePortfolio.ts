import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { portfolioKeys } from "@/lib/queryKeys";
import { fetchPortfolioByName } from "@/api/portfolio.api";
import type { RouteParams } from "@/types/global";

export function usePortfolio() {
  const { isAuthenticated } = useAuth();
  const { portfolioName } = useParams<RouteParams>();

  return useQuery({
    queryKey: portfolioKeys.byName(portfolioName!),
    queryFn: () => fetchPortfolioByName(portfolioName!),
    enabled: isAuthenticated && !!portfolioName,
    staleTime: Infinity,
  });
}
