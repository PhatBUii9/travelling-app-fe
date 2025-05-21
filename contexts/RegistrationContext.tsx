import { IFormInputs, RegContextType } from "@/types/type";
import { createContext, useContext, useState } from "react";

const RegistrationContext = createContext<RegContextType | undefined>(
  undefined
);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<IFormInputs | null>(null);
  return (
    <RegistrationContext.Provider value={{ data, setData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used inside RegistrationProvider");
  }
  return context;
};
