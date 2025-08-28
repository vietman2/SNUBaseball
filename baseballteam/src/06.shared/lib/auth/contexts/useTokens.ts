import { createContext, useContext } from "react";

export interface TokensContextType {
  setToken: (accessToken: string) => void;
  clearToken: () => void;
}

export const TokensContext = createContext<TokensContextType | undefined>(
  undefined
);

export const useTokens = () => {
  const context = useContext(TokensContext);
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokensProvider");
  }
  return context;
};
