import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="p-4 flex justify-between items-center bg-white/50 text-black sticky top-0 z-50 backdrop-blur-sm shadow-md">
      <Link to="/" className="font-bold text-xl">
        <h1>TicTacToe</h1>
      </Link>

      {/* TODO - logout functionality */}
      {isAuthenticated && (
        <Button className="w-fit py-1" onClick={logout}>
          Logout
        </Button>
      )}
    </header>
  );
}
