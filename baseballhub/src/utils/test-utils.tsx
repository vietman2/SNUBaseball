import { ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { AuthProvider } from "@pages/Auth";
import { UserProfileType } from "@models/user/person";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "queries"> {
  initialUser?: UserProfileType;
}

export const renderWithProviders = (
  ui: ReactElement,
  { ...renderOptions }: RenderWithProvidersOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
