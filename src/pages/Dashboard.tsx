export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <h1>Dashboard Page</h1>
      <div>{user?.email}</div>
    </>
  );
}
