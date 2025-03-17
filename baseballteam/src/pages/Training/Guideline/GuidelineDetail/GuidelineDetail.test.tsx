import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { GuidelineDetail } from "./GuidelineDetail";
import * as AuthContext from "@contexts/auth";
import { sampleGuidelineDetail } from "@data/training";
import { sampleAdmin, sampleAuthorProfile, sampleProfile } from "@data/user";
import * as GuidelinesAPI from "@services/training/guidelines";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Guideline", () => ({
  InstagramContent: () => <div>InstagramContent</div>,
}));

describe("<GuidelineDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(Router, "useParams").mockReturnValue({
      guidelineId: "1",
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAuthorProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest
      .spyOn(GuidelinesAPI, "getGuidelinesDetail")
      .mockResolvedValue(sampleGuidelineDetail);
    jest.spyOn(GuidelinesAPI, "deleteGuideline").mockResolvedValue(true);
  });

  it("handles error correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(GuidelinesAPI, "getGuidelinesDetail").mockResolvedValue(null);
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles delete", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete fail", async () => {
    jest.spyOn(GuidelinesAPI, "deleteGuideline").mockResolvedValue(null);
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("삭제하기")));
  });

  it("handles delete cancel", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("삭제하기")));
  });

  it("handles like and edit", async () => {
    jest
      .spyOn(GuidelinesAPI, "getGuidelinesDetail")
      .mockResolvedValue({ ...sampleGuidelineDetail, is_liked: true });
    jest.spyOn(GuidelinesAPI, "likeGuideline").mockResolvedValue(true);
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByTestId("like"));
    });
  });

  it("handles like fail", async () => {
    jest.spyOn(GuidelinesAPI, "likeGuideline").mockResolvedValue(null);
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => fireEvent.click(screen.getByTestId("like")));
  });

  it("render instagram correctly as normal user", async () => {
    jest
      .spyOn(GuidelinesAPI, "getGuidelinesDetail")
      .mockResolvedValue({ ...sampleGuidelineDetail, is_youtube: false });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<GuidelineDetail />);

    await waitFor(() => expect(screen.getByText("내용 1")));
  });
});
