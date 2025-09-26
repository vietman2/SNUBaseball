import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ViewsContext } from "../contexts/useViews";

interface Props {
  children: ReactNode;
}

export function ViewsProvider({ children }: Readonly<Props>) {
  const [activeView, setActiveView] = useState<"GRID" | "LIST">("GRID");

  const switchToGrid = useCallback(() => {
    setActiveView("GRID");
    // 로컬스토리지에 저장
    localStorage.setItem("preferred-view", "GRID");
  }, []);
  const switchToList = useCallback(() => {
    setActiveView("LIST");
    localStorage.setItem("preferred-view", "LIST");
  }, []);

  useEffect(() => {
    const savedView = localStorage.getItem("preferred-view");
    if (savedView === "GRID" || savedView === "LIST") {
      setActiveView(savedView);
    }
  }, []);

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
