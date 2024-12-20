import { DesktopLayout } from "./Desktop/Desktop";
import { MobileLayout } from "./Mobile/Mobile";
import { useWindowSize } from "@hooks/useWindowSize";

export function RootLayout() {
  const { width } = useWindowSize();

  if (width > 768) return <DesktopLayout />;
  else return <MobileLayout />;
}
