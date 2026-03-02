import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

export default function PublicHeader() {
  const location = useLocation();
  const isButtonVisible = location.pathname !== "/auth";
  return (
    <header className="p-2 shadow-around rounded-md flex justify-between items-center">
      <Link to={"/"}>
        <div className="max-w-8">
          <img className="w-full" src="/logo.png" alt="Logo" />
        </div>
      </Link>
      <div>
        {isButtonVisible && (
          <Button variant={"outline"} asChild>
            <Link to={"/auth"}>Log in</Link>
          </Button>
        )}
        <Button className="ml-2">Get Tracker Free</Button>
      </div>
    </header>
  );
}
