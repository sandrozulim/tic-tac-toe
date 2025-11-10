import { Header } from "../Header";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="px-4 py-8 bg-white text-black">
        <Outlet />
      </main>
    </div>
  );
}
