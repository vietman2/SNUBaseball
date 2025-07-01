import { createContext, useContext } from "react";

import type { ThemeColorType } from "../models/types";

interface ColorContextType {
  colors: ThemeColorType;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
