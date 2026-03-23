import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.page";
import AuthPage from "@/pages/auth/AuthPage";
import PublicLayout from "@/layout/PublicLayout";
import ProtectedLayout from "@/layout/ProtectedLayout";
import Dashboard from "@/pages/Dashboard.page";
import Coin from "@/pages/Coin.page";
import { DashboardLayout } from "@/layout/DashboardLayout";
import RegisterPage from "@/pages/auth/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      {/* protected */}
      <Route element={<ProtectedLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/dashboard/main" replace />} />
          <Route path="/dashboard/:portfolioName" element={<Dashboard />} />
          <Route path="/dashboard/:portfolioName/coins/:symbol" element={<Coin />} />
        </Route>
      </Route>
    </Routes>
  );
}
