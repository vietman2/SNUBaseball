import { Team } from "./Team";
import * as AuthContext from "@contexts/auth";
import { sampleAdmin, sampleProfile } from "@data/user/people";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Team", () => ({
  TeamTable: () => <div>TeamTable</div>,
}));

describe("<Team />", () => {
  it("renders correctly", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });

    renderWithProviders(<Team />);
  });

  it("renders as admin", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });

    renderWithProviders(<Team />);
  });
});
