import { DashboardAssets } from "@/features/dashboard";
import type { Coin, Transaction } from "@/types/global";
import { useAuth } from "@/features/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { portfolioName } = useParams<{ portfolioName: string }>();

  function onRowClick(coin: Omit<Coin<Transaction>, "transactions">) {
    navigate(`/dashboard/${portfolioName}/coins/${coin.symbol}`);
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <div>{user?.email}</div>
      <div className="border rounded-md min-h-[80vh]">
        <DashboardAssets onRowClick={onRowClick} />
      </div>
    </>
  );
}
