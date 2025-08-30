import type { JSX, ReactElement, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { render } from "@testing-library/react";

import { StylesProvider } from "../01.app/providers";

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
        <StylesProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </StylesProvider>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
    client,
  };
}
