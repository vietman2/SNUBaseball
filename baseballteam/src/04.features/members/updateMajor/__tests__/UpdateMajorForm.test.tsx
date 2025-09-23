import { beforeEach, describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { UpdateMajorForm } from "@features/members/updateMajor";
import { MajorSelectsProvider, sampleColleges } from "@entities/majors";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("UpdateMajorForm", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    // mock successful GET request for colleges and departments
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: sampleColleges,
    });
    // mock successful PUT request
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValue({
      data: {
        ...UserEntity.sampleUser.member,
        major: sampleColleges[1].departments[0],
      },
    });
  });

  it("handles update successfully and replaces old query data", async () => {
    const sampleClient = createTestQueryClient();
    await sampleClient.setQueryData(["me"], UserEntity.sampleUser);

    const { getByTestId } = renderWithProviders(
      <MajorSelectsProvider originalMajor={null}>
        <UpdateMajorForm memberId={1} closeModal={vi.fn()} />
      </MajorSelectsProvider>,
      { client: sampleClient }
    );

    await waitFor(() => {
      expect(getByTestId("update-major-form")).toBeInTheDocument();
    });

    // trying to submit without any changes will do nothing
    fireEvent.submit(getByTestId("update-major-form"));

    fireEvent.change(getByTestId("college-select"), {
      target: { value: "2" },
    });
    fireEvent.change(getByTestId("department-select"), {
      target: { value: "3" },
    });

    fireEvent.submit(getByTestId("update-major-form"));
  });

  it("handles fetch colleges", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockRejectedValueOnce(
      new Error("API Error")
    );

    renderWithProviders(
      <MajorSelectsProvider originalMajor={null}>
        <UpdateMajorForm memberId={1} closeModal={vi.fn()} />
      </MajorSelectsProvider>
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "전공 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    });
  });

  it("handles non-existent initial major and update major error", async () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: {
        ...UserEntity.sampleUser,
        member: {
          ...UserEntity.sampleUser.member,
          major: {
            id: 5,
            name: "비전공",
            short_name: "비전공",
            college: "인문대학",
            college_id: 2,
          },
        },
      },
      isAuthenticated: true,
    });

    const { getByTestId, getByText } = renderWithProviders(
      <MajorSelectsProvider originalMajor={null}>
        <UpdateMajorForm memberId={1} closeModal={vi.fn()} />
      </MajorSelectsProvider>
    );

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    // select non-existent options
    fireEvent.change(getByTestId("college-select"), {
      target: { value: "3" },
    });
    fireEvent.change(getByTestId("department-select"), {
      target: { value: "6" },
    });

    fireEvent.click(getByTestId("submit-major-form-button")); // do nothing
  });

  it("handles update error", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <MajorSelectsProvider originalMajor={null}>
        <UpdateMajorForm memberId={1} closeModal={vi.fn()} />
      </MajorSelectsProvider>
    );

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    // select valid options
    fireEvent.change(getByTestId("college-select"), {
      target: { value: "2" },
    });
    fireEvent.change(getByTestId("department-select"), {
      target: { value: "3" },
    });

    // known error
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValue({});
    fireEvent.click(getByTestId("submit-major-form-button")); // do nothing

    await waitFor(() => {
      expect(getByText("Sample Error Message")).toBeInTheDocument();
    });
  });
});
