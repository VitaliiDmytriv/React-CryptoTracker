import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

export default function PublicHeader() {
  const location = useLocation();
  const isLoginVisible = location.pathname !== "/auth";
  const isRegisterVisible = location.pathname !== "/register";
  return (
    <div className="p-2 shadow-around rounded-md">
      <header className="flex justify-between items-center max-w-7xl m-auto">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <div className="max-w-8">
              <img className="w-full" src="/logo.png" alt="Logo" />
            </div>
          </Link>
          <span className="font-bold">Crypto Tracker</span>
        </div>
        <div>
          {isLoginVisible && (
            <Button size={"sm"} variant={"outline"} asChild>
              <Link to={"/auth"}>Log in</Link>
            </Button>
          )}
          {isRegisterVisible && (
            <Button size={"sm"} className="ml-2" asChild>
              <Link to={"/register"}>Get Tracker Free</Link>
            </Button>
          )}
        </div>
      </header>
    </div>
  );
}
