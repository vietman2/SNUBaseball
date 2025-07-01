import type { JSX, ReactElement, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

import { AuthProvider, ColorsProvider } from "../01.app/providers";
import { light } from "@shared/lib/colors";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  { client = createTestQueryClient() } = {}
) {
  function Wrapper({ children }: Readonly<PropsWithChildren>): JSX.Element {
    return (
      <QueryClientProvider client={client}>
        <ThemeProvider theme={{ colors: light }}>
          <AuthProvider>
            <ColorsProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </ColorsProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
    client,
  };
}
