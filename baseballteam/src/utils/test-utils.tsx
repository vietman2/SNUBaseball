import { ReactElement, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "@contexts/auth";
import { GalleryProvider } from "@contexts/gallery";
import { ThemeProvider as MyThemeProvider } from "@contexts/theme";
import { light } from "@themes/themeColors";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "queries"> {
  withRouter?: boolean;
}

export const renderWithProviders = (
  ui: ReactElement,
  { ...renderOptions }: RenderWithProvidersOptions = {
    withRouter: true,
  }
) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ThemeProvider theme={{ colors: light }}>
        <MyThemeProvider>
          <AuthProvider>
            <GalleryProvider>
              {renderOptions.withRouter ? (
                <BrowserRouter>{children}</BrowserRouter>
              ) : (
                children
              )}
            </GalleryProvider>
          </AuthProvider>
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
