import { DashboardAssets } from "@/features/dashboard";
import type { Coin, RouteParams, Transaction } from "@/types/global";
import { useAuth } from "@/features/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { portfolioName } = useParams<RouteParams>();

  function onRowClick(coin: Omit<Coin<Transaction>, "transactions">) {
    navigate(`/dashboard/${portfolioName}/coins/${coin.symbol}`);
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <div>{user?.userName}</div>
      <div className="border rounded-md min-h-[80vh] shadow-around">
        <DashboardAssets onRowClick={onRowClick} />
      </div>
    </>
  );
}
