import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { TabsProvider } from "../contexts/TabsProvider";
import { MobileLayout } from "./_mobile";
import { WideLayout } from "./_wide/WideLayout";
import { useAuth } from "@shared/lib/auth";

interface WindowSize {
  width: number;
  height: number;
}

export function RootLayout() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <TabsProvider>
      {windowSize.width > 768 ? <WideLayout /> : <MobileLayout />}
    </TabsProvider>
  );
}
