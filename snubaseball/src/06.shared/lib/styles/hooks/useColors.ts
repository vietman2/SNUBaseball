"use client";

import "client-only";
import { createContext, useContext } from "react";

import type { ThemeColorType } from "../models/colors";

export interface ColorContextType {
  colors: ThemeColorType;
  isDarkMode: boolean;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
