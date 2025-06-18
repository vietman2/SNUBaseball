import { describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { TextInput } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Inputs");

describe("TextInput", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(
      <>
        <TextInput
          value="value 1"
          onChange={vi.fn()}
          placeholder="placeholder 1"
        />
        <TextInput
          value="value 2"
          onChange={vi.fn()}
          placeholder="placeholder 2"
          password
        />
      </>
    );

    fireEvent.change(getByTestId("textinput-placeholder 1"), {
      target: { value: "new value" },
    });
  });
});
