"use client";

import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import {
  ColorContext,
  type ColorContextType,
  GlobalStyles,
  StyledComponentsRegistry,
  breakpoints,
  dark,
  light,
} from "@shared/lib/styles";

interface Props {
  children: React.ReactNode;
  initialDark: boolean;
}

/**
 * styles를 SSR에서 사용하기 위한 레지스트리 컴포넌트를 감싸고 있으며,
 * 커스텀 테마를 적용하는 프로바이더.
 */

export function StylesProvider({
  children,
  initialDark,
}: Readonly<Props>): React.JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark">(
    initialDark ? "dark" : "light"
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
    document.cookie = `theme=${
      isDark ? "dark" : "light"
    }; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, []);

  const value = useMemo<ColorContextType>(
    () => ({
      colors: theme === "dark" ? dark : light,
      isDarkMode: theme === "dark",
    }),
    [theme]
  );

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={{ breakpoints, colors: value.colors }}>
        <ColorContext.Provider value={value}>
          <GlobalStyles />
          {children}
        </ColorContext.Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
