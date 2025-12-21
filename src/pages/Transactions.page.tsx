type RouteParams = {
  symbol: string;
};

export default function Transactions() {
  const { symbol } = useParams<RouteParams>();
  return (
    <div>
      Transactions
      <div>{symbol}</div>
    </div>
  );
}
