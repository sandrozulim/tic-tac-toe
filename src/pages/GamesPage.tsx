import { useAuth } from "../context/AuthContext";

export default function GamesPage() {
  const auth = useAuth();

  return <h1>Games Page</h1>;
}
