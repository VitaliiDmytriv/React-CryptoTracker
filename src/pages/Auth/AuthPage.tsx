import AuthLogin from "@/components/auth/AuthLogin";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  return (
    <>
      <h1 className="text-3xl">AuthPage</h1>
      <Button variant={"link"}>
        <Link to={"/"}>Home</Link>
      </Button>
      <div className="flex justify-center">
        <AuthLogin />
      </div>
    </>
  );
}
