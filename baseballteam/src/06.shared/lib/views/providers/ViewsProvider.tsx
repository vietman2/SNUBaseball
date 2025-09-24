import { useCallback, useMemo, useState, type ReactNode } from "react";

import { ViewsContext } from "../contexts/useViews";

interface Props {
  children: ReactNode;
}

export function ViewsProvider({ children }: Readonly<Props>) {
  const [activeView, setActiveView] = useState<"GRID" | "LIST">("GRID");

  const switchToGrid = useCallback(() => setActiveView("GRID"), []);
  const switchToList = useCallback(() => setActiveView("LIST"), []);

  const value = useMemo(
    () => ({
      activeView,
      switchToGrid,
      switchToList,
    }),
    [activeView, switchToGrid, switchToList]
  );

  return (
    <ViewsContext.Provider value={value}>{children}</ViewsContext.Provider>
  );
}
