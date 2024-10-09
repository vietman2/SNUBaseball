import { ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "@contexts/auth";
import { ThemeProvider as MyThemeProvider } from "@contexts/theme";
import { UserProfileType } from "@models/user/person";
import { light } from "@themes/themeColors";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "queries"> {
  initialUser?: UserProfileType;
}

export const renderWithProviders = (
  ui: ReactElement,
  { ...renderOptions }: RenderWithProvidersOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ThemeProvider theme={{ colors: light }}>
        <MyThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </MyThemeProvider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};
