import { data } from "@/data";
import AssetsTable from "@/features/assets-table/AssetsTable";
import type { Coin } from "@/types/global";

const coins = Object.values(data);

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function onRowClick(coin: Coin) {
    navigate(`/transactions/${coin.symbol}`);
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <div>{user?.email}</div>
      <div className="border rounded-md min-h-[80vh]">
        <AssetsTable onRowClick={onRowClick} data={coins} />
      </div>
    </>
  );
}
