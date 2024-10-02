import { ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { light } from "@themes/themeColors";

export const renderWithProviders = (
  ui: ReactElement,
  renderOptions?: Omit<RenderOptions, "queries">
): RenderResult => {
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
    <ThemeProvider theme={{ colors: light }}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};
