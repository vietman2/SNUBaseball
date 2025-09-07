import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { ColorContext, dark, GlobalStyles, light } from "@shared/lib/styles";

interface Props {
  children: ReactNode;
}

export function StylesProvider({ children }: Readonly<Props>) {
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
