import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { WideLayout } from "./Wide/WideLayout";
import { MobileLayout } from "./Mobile/MobileLayout";
import { useNavigation } from "@contexts/navigation";

export function RootLayout() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const location = useLocation();
  const { tabs, setCurrentTab, setCurrentSubTab } = useNavigation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    const subpath = location.pathname.split("/")[2];

    const tab = tabs.find((tab) => tab.path === `/${path}`);

    if (tab) {
      setCurrentTab(tab);

      if (subpath) {
        const subtab = tab.subtabs.find(
          (subtab) => subtab.path === `/${path}/${subpath}`
        );
        if (subtab) {
          setCurrentSubTab(subtab);
        }
      }
    }
  }, [location, tabs, setCurrentTab, setCurrentSubTab]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width > 768) return <WideLayout />;
  else return <MobileLayout />;
}
