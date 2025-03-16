import { useEffect, useState } from "react";

import { WideLayout } from "./Wide/WideLayout";
import { MobileLayout } from "./Mobile/MobileLayout";

export function RootLayout() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width > 768) return <WideLayout />;
  else return <MobileLayout />;
}
