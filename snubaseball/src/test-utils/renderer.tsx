import { JSX, ReactElement, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { breakpoints, light } from "@shared/lib/styles";

export function renderWithProviders(ui: ReactElement) {
  function Wrapper({ children }: Readonly<PropsWithChildren>): JSX.Element {
    return (
      <ThemeProvider theme={{ breakpoints, colors: light }}>
        {children}
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper }) }; //, client };
}

export async function getElementFromAsyncServerComponent<P>(
  componentFn: (props: P) => Promise<ReactElement>,
  props: P
): Promise<ReactElement> {
  return await componentFn(props);
}
