import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { portfolioKeys } from "@/lib/queryKeys";
import { fetchCurrentPortfolio } from "@/api/portfolio.api";

export function usePortfolio() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: portfolioKeys.current(),
    queryFn: fetchCurrentPortfolio,
    enabled: isAuthenticated,
  });
}
