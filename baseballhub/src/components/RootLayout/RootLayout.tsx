import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import { useWindowSize } from "@hooks/useWindowSize";

export default function RootLayout() {
  const { width } = useWindowSize();

  if (width > 768) {
    return <Desktop />;
  } else {
    return <Mobile />;
  }
}
