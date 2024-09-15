import { ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { AuthProvider } from "@pages/Auth";
import { UserType } from "@models/person";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "queries"> {
  initialUser?: UserType;
}

export const renderWithProviders = (
  ui: ReactElement,
  { initialUser, ...renderOptions }: RenderWithProvidersOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
