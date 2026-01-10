import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <main className="p-2">
        <Outlet />
      </main>
    </div>
  );
}
