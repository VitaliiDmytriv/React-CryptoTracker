import api from "@/api/axios";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/");
        console.log(response.data.message);

        setData(response.data.message);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      Home <br />
      {data ?? <div>Waiting data</div>}
    </div>
  );
}
