import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <div className="px-3 py-2">
        <Outlet />
      </div>
    </div>
  );
}
