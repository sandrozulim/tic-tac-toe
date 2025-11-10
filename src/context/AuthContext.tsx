import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { api } from "../api/axios";

type AuthContextType = {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = (newToken: string, username: string) => {
    setToken(newToken);
    setUsername(username);
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post("/logout/");
      }
    } catch (err) {
      console.error("Logout failed");
    } finally {
      setToken(null);
    }
  };

  const value: AuthContextType = {
    token,
    username,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
