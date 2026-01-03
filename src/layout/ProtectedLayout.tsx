import SessionExpiredDialog from "@/components/dialogs/SessionExpiredDialog";

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
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
}
