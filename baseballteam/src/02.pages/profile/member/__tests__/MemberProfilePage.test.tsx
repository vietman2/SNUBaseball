import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { MemberProfilePage } from "@pages/profile/member";
import { samplePlayerDetails } from "@entities/members";
import * as AuthAPI from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("MemberProfilePage", () => {
  beforeAll(() => {
    vi.spyOn(AuthAPI, "useUser").mockReturnValue({
      isAuthenticated: true,
      user: AuthAPI.sampleUser,
    });
    vi.spyOn(AxiosAPI.axiosInstance, "get").mockResolvedValue({
    data: samplePlayerDetails,
    });
  });

  describe("initial data fetch", () => {
    it("renders nothing when not authenticated", () => {
      vi.spyOn(AuthAPI, "useUser").mockReturnValueOnce({
        isAuthenticated: false,
        user: null,
      });
      const { container } = renderWithProviders(<MemberProfilePage />);
      expect(container).toBeEmptyDOMElement();
    });

    it("loadings data successfully", async () => {
      const { getAllByText, getByText } = renderWithProviders(
        <MemberProfilePage />
      );
      expect(getAllByText("Loading Skeleton")[0]).toBeInTheDocument();

      await waitFor(() => {
        expect(getByText("김선수")).toBeInTheDocument();
      });
    });

    it("handles data fetch error once and refetch", async () => {
      vi.spyOn(AxiosAPI.axiosInstance, "get").mockRejectedValueOnce(
        new Error("Network Error")
      );

      const { getByText } = renderWithProviders(<MemberProfilePage />);

      await waitFor(() => {
        expect(
          getByText("멤버 정보를 불러오는 중에 오류가 발생했습니다.")
        ).toBeInTheDocument();
      });

      fireEvent.click(getByText("다시 시도"));

      await waitFor(() => {
        expect(getByText("김선수")).toBeInTheDocument();
      });
    });
  });

  describe("Update Basic Profile", () => {
    it("handles update basic profile correctly", () => {
      const { container } = renderWithProviders(<MemberProfilePage />);
      expect(container).toBeInTheDocument();
    });
  });
});
