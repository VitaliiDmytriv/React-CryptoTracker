import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="px-3 py-2">
        <Outlet />
      </main>
    </div>
  );
}
