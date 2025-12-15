import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth/AuthPage";
import PublicLayout from "@/layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import Dashboard from "@/pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      {/* protected */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route></Route>
      </Route>
    </Routes>
  );
}
