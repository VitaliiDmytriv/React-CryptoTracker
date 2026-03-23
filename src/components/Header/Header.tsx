import { DropdownMenuHeader } from "./DropdownMenuHeader";

export function Header() {
  return (
    <div className="p-2 shadow-around rounded-md ">
      <header className="  flex justify-between items-center max-w-7xl m-auto">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <div className="max-w-8">
              <img className="w-full" src="/logo.png" alt="Logo" />
            </div>
          </Link>
          <span className="font-bold">Crypto Tracker</span>
        </div>
        <DropdownMenuHeader />
      </header>
    </div>
  );
}
