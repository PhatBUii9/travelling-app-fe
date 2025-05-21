import React, { createContext, useContext, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { LoadingContextType } from "@/types/type";

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <FullScreenLoader />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

const FullScreenLoader = () => (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      elevation: 10,
    }}
  >
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);
