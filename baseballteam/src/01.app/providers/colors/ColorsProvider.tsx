import { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { ColorContext, dark, light } from "@shared/lib/colors";

export function ColorsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const colors = useMemo(() => {
    return isDarkMode ? dark : light;
  }, [isDarkMode]);

  const value = useMemo(() => ({ colors, toggleTheme }), [colors]);

  return (
    <ThemeProvider theme={{ colors }}>
      <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    </ThemeProvider>
  );
}
