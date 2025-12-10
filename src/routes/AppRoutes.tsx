import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth/AuthPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}
