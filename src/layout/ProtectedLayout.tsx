import SessionExpiredDialog from "@/components/dialogs/SessionExpiredDialog";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useAuth } from "@/features/auth";
import { Toaster } from "sonner";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const dialogOpen = !isAuthenticated;

  function closeDialog() {
    navigate("/auth", { replace: true });
  }

  if (isLoading) return <div>Loading...</div>;

  if (dialogOpen) {
    return <SessionExpiredDialog open={dialogOpen} onClose={closeDialog} />;
  }

  return (
    <>
      <Outlet />
      <TransactionDialog />
      <Toaster />
    </>
  );
}
