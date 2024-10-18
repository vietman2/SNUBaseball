import { fireEvent, screen, waitFor } from "@testing-library/react";

import { InformationDetail } from "./InformationDetail";
import * as AuthContext from "@contexts/auth";
import { sampleInformationDetail } from "@data/forum";
import { sampleProfile, sampleAdmin } from "@data/user";
import * as InformationAPI from "@services/board/information";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.spyOn(window, "alert").mockImplementation(() => null);
jest.spyOn(window, "open").mockImplementation(() => null);

describe("<InformationDetail />", () => {
  const render = async () => {
    await waitFor(() =>
      renderWithProviders(
        <InformationDetail
          informationId={1}
          goBack={jest.fn()}
          handleEdit={jest.fn()}
        />
      )
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue({
      status: 200,
      data: sampleInformationDetail,
    });
  });

  it("handles null informationId correctly", async () => {
    renderWithProviders(
      <InformationDetail
        informationId={null}
        goBack={jest.fn()}
        handleEdit={jest.fn()}
      />
    );
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue(null);
    await render();
  });

  it("renders correctly", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    await render();
  });

  it("renders correctly with attachments", async () => {
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue({
      status: 200,
      data: sampleInformationDetail,
    });
    await render();

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("부실 청소 가이드"))
    );
  });

  it("handles delete correctly", async () => {
    jest.spyOn(InformationAPI, "deleteInformation").mockResolvedValue({
      status: 204,
      data: {},
    });
    await render();

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("delete-information"))
    );
  });

  it("handles delete reject", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    await render();

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("delete-information"))
    );
  });

  it("handles delete fail", async () => {
    jest.spyOn(InformationAPI, "deleteInformation").mockResolvedValue(null);
    await render();

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("delete-information"))
    );
  });
});
