import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { MembersListPage } from "@pages/members";
import { sampleMemberDetails } from "@entities/members";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("@entities/majors", async () => ({
  MajorSelectsProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CollegeSelect: () => <div>CollegeSelect Component</div>,
  DepartmentSelect: () => <div>DepartmentSelect Component</div>,
  useMajorSelects: () => ({
    loading: false,
    error: false,
    isUpdated: true,
    collegeOptions: [],
    selectedCollegeId: 5,
    setSelectedCollegeId: vi.fn(),
    departmentOptions: [],
    selectedMajorId: 5,
    setSelectedMajorId: vi.fn(),
  }),
}));

describe("MembersListPage", () => {
  beforeEach(() => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: [sampleMemberDetails],
    });
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
      data: { ...sampleMemberDetails, name: "김신규", studentId: "20250001" },
    });
  });

  const fillForm = (getByTestId: (id: string) => HTMLElement) => {
    // Major는 Mock 해두어, 이미 선택된 상태
    fireEvent.change(getByTestId("name-input"), {
      target: { value: "김신규" },
    });
    fireEvent.change(getByTestId("student-id-input"), {
      target: { value: "2025-54321" },
    });
    fireEvent.change(getByTestId("birth-date-input"), {
      target: { value: "2005-03-01" },
    });
    fireEvent.change(getByTestId("join-date-input"), {
      target: { value: "2024-03-01" },
    });
    fireEvent.change(getByTestId("phone-input"), {
      target: { value: "010-1234-5678" },
    });
    fireEvent.change(getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
  };

  it("renders and handles create new member correctly", async () => {
    const { getByTestId, getByText } = renderWithProviders(<MembersListPage />);

    await waitFor(() => {
      expect(getByText("김선수 (2025)")).toBeInTheDocument();
    });

    // Open Modal
    fireEvent.click(getByText("새 부원 추가"));

    // Submit the form without filling to check validation (do nothing)
    fireEvent.submit(getByTestId("new-member-form"));

    fillForm(getByTestId);

    // Submit the form
    fireEvent.submit(getByTestId("new-member-form"));

    await waitFor(() => {
      expect(getByText("김신규 (2025)")).toBeInTheDocument();
    });
  });

  it("handles create new member error", async () => {
    const { getByTestId, getByText } = renderWithProviders(<MembersListPage />);

    await waitFor(() => {
      expect(getByText("김선수 (2025)")).toBeInTheDocument();
    });

    // Open Modal
    fireEvent.click(getByText("새 부원 추가"));

    fillForm(getByTestId);

    // Submit the form
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValue(
      new Error("Network Error")
    );
    fireEvent.click(getByText("추가")); // 이번엔 클릭으로 테스트

    await waitFor(() => {
      expect(getByText("Sample Error Message")).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockRejectedValue(
      new Error("Network Error")
    );

    const { getByText } = renderWithProviders(<MembersListPage />);

    await waitFor(() => {
      expect(
        getByText("오류가 발생했습니다: Network Error")
      ).toBeInTheDocument();
    });
  });
});
