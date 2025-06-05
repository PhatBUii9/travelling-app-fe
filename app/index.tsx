// src/app/index.tsx  (or wherever your Home route file lives)
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constant/routes";

const Home: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  return isAuthenticated ? (
    <Redirect href={ROUTES.ROOT.TABS.DASHBOARD} />
  ) : (
    <Redirect href={ROUTES.AUTH.SIGN_IN} />
  );
};

export default Home;
