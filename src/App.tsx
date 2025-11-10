import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { AppLayout } from "./components/layouts/AppLayout";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<GamesPage />} />
        <Route path="/games/:id" element={<GamePage />} />
      </Route>
      {/* catch all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
