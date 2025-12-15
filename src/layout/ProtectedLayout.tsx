import SessionExpiredDialog from "@/components/dialogs/SessionExpiredDialog";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading, revalidateAuth } = useAuth();
  const navigate = useNavigate();
  const dialogOpen = !isAuthenticated;

  useEffect(() => {
    revalidateAuth();
  }, []);

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
    </>
  );
}
