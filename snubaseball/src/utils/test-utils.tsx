import { ReactElement, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { NavigationProvider } from "@contexts/navigation";
import { colors, ThemeProvider as MyThemeProvider } from "@contexts/theme";

export const renderWithProviders = (ui: ReactElement) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ThemeProvider theme={{ colors: colors }}>
        <MyThemeProvider>
          <NavigationProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </NavigationProvider>
        </MyThemeProvider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper }) };
};
