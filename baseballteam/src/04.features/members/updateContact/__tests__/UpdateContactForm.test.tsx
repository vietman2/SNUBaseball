import { describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { UpdateContactForm } from "@features/members/updateContact";
import { ContactInputsProvider } from "@entities/members";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("UpdateContactForm", () => {
  it("handles update contacts fail (update contacts error)", async () => {
    const { getByTestId, getByText, getByLabelText } = renderWithProviders(
      <ContactInputsProvider
        originalPhone={null}
        originalEmail={null}
        originalAddress={null}
      >
        <UpdateContactForm memberId={1} closeModal={vi.fn()} />
      </ContactInputsProvider>
    );

    // does nothing when no changes
    fireEvent.submit(getByTestId("update-contacts-form"));

    await waitFor(() => {
      expect(getByText("연락처 변경")).toBeInTheDocument();
    });

    fireEvent.change(getByLabelText("휴대폰 번호"), {
      target: { value: "010-9999-8888" },
    });

    // unknown error
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce(
      new Error("API Error")
    );
    fireEvent.click(getByTestId("submit-contacts-update-button"));

    await waitFor(() => {
      expect(getByText("Sample Error Message")).toBeInTheDocument();
    });
  });
});
