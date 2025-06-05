import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";
import { getToken, storeToken, removeToken } from "../utils/tokenStorage";
import { getUser, storeUser, removeUser } from "../utils/userStorage";
import { AuthContextType, User } from "@/types/type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken = await getToken();
        const savedUser = await getUser();
        if (savedToken) {
          setToken(savedToken);
          setUser(savedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to load auth data", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (newToken: string, userData?: User) => {
    await storeToken(newToken);
    setToken(newToken);
    setIsAuthenticated(true);

    if (userData) {
      await storeUser(userData);
      setUser(userData);
    }
  };

  const logout = async () => {
    await Promise.all([removeToken(), removeUser()]);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    Alert.alert("Logged out", "Token and User Data cleared");
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      token,
      loading,
      user,
    }),
    [isAuthenticated, token, loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
