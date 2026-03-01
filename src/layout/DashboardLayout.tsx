import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <main className="px-3 py-2">
        <Outlet />
      </main>
    </div>
  );
}
