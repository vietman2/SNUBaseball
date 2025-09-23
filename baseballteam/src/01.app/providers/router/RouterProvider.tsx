import { useMemo, type ReactNode } from "react";
import { useLocation } from "react-router";

import {
  type BackgroundState,
  isEqual,
  RouterContext,
  type RouterContextType,
} from "@shared/lib/router";

interface Props {
  children: ReactNode;
}

export function RouterProvider({ children }: Readonly<Props>) {
  const location = useLocation();
  const state = (location.state ?? null) as Partial<BackgroundState> | null;

  const backgroundLocation = state?.backgroundLocation ?? location;
  const displayLocation = location;

  const value = useMemo<RouterContextType>(() => {
    return {
      backgroundLocation: backgroundLocation,
      displayLocation: displayLocation,
      isModal: !isEqual(backgroundLocation, displayLocation),
    };
  }, [displayLocation, backgroundLocation]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}
