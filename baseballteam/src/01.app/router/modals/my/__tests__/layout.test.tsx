import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { MyLayout } from "../layout";
import * as AxiosAPI from "@shared/lib/axios";
import * as RouterAPI from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

describe("ProfileLayout", () => {
  const sampleLocation = {
    pathname: "/my/account",
    search: "",
    hash: "",
    key: "",
    state: null,
  };

  beforeAll(() => {
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      backgroundLocation: sampleLocation,
      displayLocation: sampleLocation,
      isModal: true,
    });
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("should render correctly and handle logout", async () => {
    const { getByText } = renderWithProviders(<MyLayout />);

    expect(getByText("내 프로필")).toBeInTheDocument();
    expect(getByText("계정")).toBeInTheDocument();
    expect(getByText("로그아웃")).toBeInTheDocument();

    // first attempt: cancel logout
    vi.spyOn(window, "confirm").mockReturnValueOnce(false);
    fireEvent.click(getByText("로그아웃"));

    // second attempt: confirm logout
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);
    vi.spyOn(AxiosAPI.axiosInstance, "post").mockResolvedValue({});

    fireEvent.click(getByText("로그아웃"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Successfully logged out.");
    });
  });
});
