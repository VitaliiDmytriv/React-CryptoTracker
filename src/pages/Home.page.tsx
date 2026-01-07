import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <br />
      <h2>Welcome to your Crypto trucker</h2>
      {isAuthenticated ? (
        <>
          <p>Hello, {user?.userName}!</p>
          <Link to="/dashboard">Go to Dashboard</Link>
        </>
      ) : (
        <>
          <p>Start exploring</p>
          <Button variant={"link"}>
            <Link to="/auth">Login</Link>
          </Button>
        </>
      )}
    </div>
  );
}
