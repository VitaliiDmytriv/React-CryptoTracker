import AssetsTable from "@/features/assets-table/AssetsTable";
import type { Coin } from "@/types/global";
import api from "@/api/axios";
import { useAuth } from "@/features/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coins, setCoins] = useState();

  useEffect(() => {
    async function getAssets() {
      const response = await api.get("/dashboard");
      setCoins(response.data.portfolio.coins);
      console.log(response.data.portfolio.coins);
    }
    getAssets();
  }, []);

  function onRowClick(coin: Coin) {
    navigate(`/transactions/${coin.symbol}`);
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <div>{user?.email}</div>
      <div className="border rounded-md min-h-[80vh]">
        {coins && <AssetsTable onRowClick={onRowClick} data={coins} />}
      </div>
    </>
  );
}
