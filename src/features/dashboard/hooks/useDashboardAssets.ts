import { useQuery } from "@tanstack/react-query";
import { fetchDashboardAssets } from "../api/dashboard.api";
import { useAuth } from "@/features/auth";

export function useDashboardAssets() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["dashboard", "assets"],
    queryFn: fetchDashboardAssets,
    enabled: isAuthenticated,
  });
}
