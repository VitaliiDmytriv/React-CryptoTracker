export default function PublicLayout() {
  return (
    <section className="min-h-screen flex flex-col">
      <PublicHeader />
      <Outlet />
    </section>
  );
}
