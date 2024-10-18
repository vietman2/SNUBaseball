import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Information } from "./Information";
import * as AuthContext from "@contexts/auth";
import { sampleProfile, sampleAdmin } from "@data/user";
import { sampleInformations } from "@data/forum";
import * as InformationAPI from "@services/board/information";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Information", () => ({
  InformationDetail: ({
    goBack,
    handleEdit,
  }: {
    goBack: () => void;
    handleEdit: () => void;
  }) => <><button onClick={goBack}>InformationDetail</button>
    <button onClick={handleEdit}>InformationEdit</button>
  </>,
  InformationSimple: () => <div />,
  InformationSimpleWide: () => <div />,
  InformationSimpleWideHeader: () => <div />,
  InformationWrite: () => <div>InformationWrite</div>,
}));

describe("<Information />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(InformationAPI, "getInformations").mockResolvedValue({
      status: 200,
      data: sampleInformations,
    });
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(InformationAPI, "getInformations").mockResolvedValue(null);
    await waitFor(() => renderWithProviders(<Information />));

    await waitFor(() =>
      expect(screen.getByText("새로고침")).toBeInTheDocument()
    );
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("renders wide screen correctly", async () => {
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(800, 800));

    await waitFor(() => fireEvent.click(screen.getByTestId("information-1")));
    fireEvent.click(screen.getByText("InformationDetail"));
  });

  it("handles write mode correctly in wide screen", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => fireEvent.click(screen.getByText("새 글 등록")));

    await waitFor(() =>
      expect(screen.getByText("InformationWrite")).toBeInTheDocument()
    );
  });

  it("renders mobile screen correctly", async () => {
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(600, 600));

    await waitFor(() => fireEvent.click(screen.getByTestId("information-1")));
    fireEvent.click(screen.getByText("InformationDetail"));
  });

  it("handles write mode correctly in mobile screen", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => fireEvent.click(screen.getByText("새 글 등록")));

    await waitFor(() =>
      expect(screen.getByText("InformationWrite")).toBeInTheDocument()
    );
  });

  it("handles edit mode correctly", async () => {
    renderWithProviders(<Information />);

    await waitFor(() => fireEvent.click(screen.getByTestId("information-1")));
    fireEvent.click(screen.getByText("InformationDetail"));

    await waitFor(() =>
      expect(screen.getByText("InformationDetail")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("InformationEdit"));
  });
});
