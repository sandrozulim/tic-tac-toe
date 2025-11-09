import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <main className="relative min-h-screen px-4 py-8 bg-white text-black">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GamesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}
