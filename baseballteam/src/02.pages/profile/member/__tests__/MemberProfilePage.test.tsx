import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import BareAxios from "axios";

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
    vi.spyOn(BareAxios, "isAxiosError").mockReturnValue(true);
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
      vi.spyOn(AxiosAPI.axiosInstance, "get").mockResolvedValueOnce({
        data: {
          ...samplePlayerDetails,
          back_number: null,
          birth_date: null,
          date_joined: null,
          num_semester: null,
        },
      });

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
    beforeEach(() => {
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValue({
        data: { ...samplePlayerDetails, back_number: 5 },
      });
    });

    it("handles update basic profile correctly", async () => {
      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <MemberProfilePage />
      );

      await waitFor(() => {
        expect(getByText("김선수")).toBeInTheDocument();
      });

      // does nothing when no changes
      fireEvent.submit(getByTestId("basic-profile-form"));

      // changes back number
      fireEvent.change(getByTestId("back-number-input"), {
        target: { value: "5" },
      });
      await waitFor(() => {
        expect(getByTestId("basic-profile-submit-button")).toBeInTheDocument();
      });

      fireEvent.submit(getByTestId("basic-profile-form"));

      await waitFor(() => {
        expect(
          queryByTestId("basic-profile-submit-button")
        ).not.toBeInTheDocument();
      });
    });

    it("handles update error correctly", async () => {
      const { getByTestId, getByText } = renderWithProviders(
        <MemberProfilePage />
      );

      await waitFor(() => {
        expect(getByText("김선수")).toBeInTheDocument();
      });

      // unknown error
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce(
        new Error("Network Error")
      );
      // changes birth date to activate submit button
      await waitFor(() => {
        fireEvent.change(getByTestId("birth-date-input"), {
          target: { value: "2000-02-02" },
        });
      });
      fireEvent.submit(getByTestId("basic-profile-form"));

      await waitFor(() => {
        expect(
          getByText(
            "프로필 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요."
          )
        ).toBeInTheDocument();
      });

      // known error
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce({
        response: { data: { message: "Known Error", status: "ERROR" } },
      });

      fireEvent.submit(getByTestId("basic-profile-form"));
      await waitFor(() => {
        expect(getByText("Known Error")).toBeInTheDocument();
      });
    });
  });
});
