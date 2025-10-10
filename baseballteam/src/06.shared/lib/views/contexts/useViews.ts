import { createContext, useContext } from "react";

interface ViewsContextType {
  activeView: "GRID" | "LIST";
  switchToGrid: () => void;
  switchToList: () => void;
}

export const ViewsContext = createContext<ViewsContextType | null>(null);

export function useViews() {
  const context = useContext(ViewsContext);
  if (!context) {
    throw new Error("useViews must be used within a ViewsProvider");
  }
  return context;
}
