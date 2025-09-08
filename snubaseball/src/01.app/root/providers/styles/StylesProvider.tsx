"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import {
  GlobalStyles,
  StyledComponentsRegistry,
  ThemeColorType,
  breakpoints,
  dark,
  light,
} from "@shared/lib/styled-components";

interface Props {
  children: React.ReactNode;
}

/**
 * styled-components를 SSR에서 사용하기 위한 레지스트리 컴포넌트를 감싸고 있으며,
 * 커스텀 테마를 적용하는 프로바이더.
 */

export function StylesProvider({
  children,
}: Readonly<Props>): React.JSX.Element {
  const [colors, setColors] = useState<ThemeColorType>(light);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) setColors(dark);
    }
  }, []); // 최초 1회만 실행

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={{ breakpoints, colors }}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
