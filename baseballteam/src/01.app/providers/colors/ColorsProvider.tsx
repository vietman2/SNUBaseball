import { useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { ColorContext, GlobalStyles, dark, light } from "@shared/lib/styles";

export function ColorsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const colors = useMemo(() => {
    return isDarkMode ? dark : light;
  }, [isDarkMode]);

  const value = useMemo(
    () => ({ colors, isDarkMode, toggleTheme }),
    [colors, isDarkMode, toggleTheme]
  );

  return (
    <ThemeProvider theme={{ colors }}>
      <ColorContext.Provider value={value}>
        <GlobalStyles />
        {children}
      </ColorContext.Provider>
    </ThemeProvider>
  );
}
