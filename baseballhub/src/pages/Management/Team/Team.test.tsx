import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Team } from "./Team";
import * as AuthContext from "@contexts/auth";
import { sampleAdmin, sampleProfile } from "@data/user";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Member", () => ({
  MemberDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>MemberDetail</button>
  ),
  MemberSimple: () => <div>MemberSimple</div>,
  MemberSimpleHeader: () => <div>MemberSimpleHeader</div>,
}));

describe("<Team />", () => {
  it("renders wide screen correctly as normal user", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });

    renderWithProviders(<Team />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("member-1"));
    fireEvent.click(screen.getByText("MemberDetail"));
  });

  it("renders narrow screen correctly as admin", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });

    renderWithProviders(<Team />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("member-1"));
    fireEvent.click(screen.getByText("MemberDetail"));
  });
});
