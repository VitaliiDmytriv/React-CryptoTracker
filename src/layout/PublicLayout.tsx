import PublicHeader from "@/components/PublicHeader";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="max-w-7xl m-auto">
        <Outlet />
      </main>
    </div>
  );
}
