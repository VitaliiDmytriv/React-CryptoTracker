import api from "@/api/axios";
import type { DashboardResponse } from "../types/dashboard.types";

export async function fetchDashboardAssets() {
  const response = await api.get<DashboardResponse>("/dashboard");
  return response.data.portfolio;
}
