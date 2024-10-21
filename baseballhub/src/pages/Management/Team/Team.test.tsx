import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Team } from "./Team";
import * as AuthContext from "@contexts/auth";
import { sampleAdmin, sampleMembers, sampleProfile } from "@data/user";
import * as MemberAPI from "@services/person/members";
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
  beforeEach(() => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(sampleMembers);
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(null);
    await waitFor(() => renderWithProviders(<Team />));

    await waitFor(() => {
      expect(screen.getByText("새로고침")).toBeInTheDocument();
    });
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("renders wide screen correctly as normal user", async () => {
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
