import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

export default function PublicHeader() {
  const location = useLocation();
  const isLoginVisible = location.pathname !== "/auth";
  const isRegisterVisible = location.pathname !== "/register";
  return (
    <header className="p-2 shadow-around rounded-md flex justify-between items-center">
      <Link to={"/"}>
        <div className="max-w-8">
          <img className="w-full" src="/logo.png" alt="Logo" />
        </div>
      </Link>
      <div>
        {isLoginVisible && (
          <Button variant={"outline"} asChild>
            <Link to={"/auth"}>Log in</Link>
          </Button>
        )}
        {isRegisterVisible && (
          <Button className="ml-2" asChild>
            <Link to={"/register"}>Get Tracker Free</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
