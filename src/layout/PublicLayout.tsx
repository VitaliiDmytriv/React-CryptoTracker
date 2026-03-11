import PublicHeader from "@/components/PublicHeader";

export default function PublicLayout() {
  return (
    <section className="min-h-screen flex flex-col max-w-7xl m-auto">
      <PublicHeader />
      <Outlet />
    </section>
  );
}
