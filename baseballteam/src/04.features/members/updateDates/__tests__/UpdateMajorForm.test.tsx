import { describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { UpdateDatesForm } from "@features/members/updateDates";
import { DateInputsProvider } from "@entities/members";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("UpdateDatesForm", () => {
  it("handles null initial dates and update fail", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <DateInputsProvider originalBirthDate={null} originalJoinDate={null}>
        <UpdateDatesForm memberId={1} closeModal={vi.fn()} />
      </DateInputsProvider>
    );

    await waitFor(() => {
      expect(getByText("기타 정보 변경")).toBeInTheDocument();
    });

    // submitting without changes does nothing
    fireEvent.submit(getByTestId("update-dates-form"));

    // update dates first
    fireEvent.change(getByTestId("birth-date-input"), { target: { value: "2000-01-01" } });
    fireEvent.change(getByTestId("join-date-input"), {
      target: { value: "2022-03-01" },
    });

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce({
      response: {
        data: {
          status: "FAILURE",
          message: "Sample Error Message",
        },
      },
    });
    fireEvent.submit(getByTestId("update-dates-form"));

    await waitFor(() => {
      expect(getByText("Sample Error Message")).toBeInTheDocument();
    });
  });
});
