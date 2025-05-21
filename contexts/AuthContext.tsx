import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getToken, storeToken, removeToken } from "../utils/tokenStorage";
import { AuthContextType } from "@/types/type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await getToken();
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    await storeToken(newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setIsAuthenticated(false);
    Alert.alert("Logged out", "Token cleared");
    getToken();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
