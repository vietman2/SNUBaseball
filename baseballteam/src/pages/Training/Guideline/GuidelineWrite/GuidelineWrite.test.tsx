import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { GuidelineWrite } from "./GuidelineWrite";
import { sampleGuidelineDetail } from "@data/training";
import * as GuidelinesAPI from "@services/training/guidelines";
import { renderWithProviders } from "@utils/test-utils";

describe("<GuidelineWrite />: new", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
  });

  it("renders and handles all fields correctly", () => {
    jest.spyOn(GuidelinesAPI, "createGuideline").mockResolvedValue(true);
    renderWithProviders(<GuidelineWrite />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.change(screen.getByTestId("category"), {
      target: { value: "외야" },
    });
    fireEvent.change(screen.getByTestId("type"), { target: { value: "드릴" } });
    fireEvent.change(screen.getByTestId("min"), { target: { value: 2 } });
    fireEvent.change(screen.getByTestId("max"), { target: { value: 10 } });

    waitFor(() => fireEvent.click(screen.getByTestId("submit")));
  });

  it("handles create fail", () => {
    jest.spyOn(GuidelinesAPI, "createGuideline").mockResolvedValue(null);
    renderWithProviders(<GuidelineWrite />);

    waitFor(() => fireEvent.click(screen.getByTestId("submit")));
  });
});

describe("<GuidelineWrite />: edit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({ guidelineId: "1" });
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/edit",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    jest
      .spyOn(GuidelinesAPI, "getGuidelinesDetail")
      .mockResolvedValue(sampleGuidelineDetail);
  });

  it("handles error correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<GuidelineWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(GuidelinesAPI, "getGuidelinesDetail").mockResolvedValue(null);
    renderWithProviders(<GuidelineWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles edit correctly", async () => {
    jest
      .spyOn(GuidelinesAPI, "editGuideline")
      .mockResolvedValue(sampleGuidelineDetail);
    renderWithProviders(<GuidelineWrite />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("content-input"), {
        target: { value: "content" },
      });
      fireEvent.click(screen.getByTestId("submit"));
    });
  });

  it("handles edit fail", async () => {
    jest
      .spyOn(GuidelinesAPI, "getGuidelinesDetail")
      .mockResolvedValue({...sampleGuidelineDetail, is_drill: false});
    jest.spyOn(GuidelinesAPI, "editGuideline").mockResolvedValue(null);
    renderWithProviders(<GuidelineWrite />);

    await waitFor(() => fireEvent.click(screen.getByTestId("submit")));
  });
});
