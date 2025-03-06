import { fireEvent, screen, waitFor } from "@testing-library/react";

import { TagProvider, useTag } from "./TagContext";
import { sampleTags } from "@data/archive";
import * as TagsAPI from "@services/archive/archive";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const { allTags, selectTag } = useTag();

  return (
    <div>
      <button onClick={() => selectTag(allTags[0])}>Select Tag</button>
    </div>
  );
};

describe("<TagProvider />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(TagsAPI, "getTags").mockResolvedValue(sampleTags);
  });

  it("handles tag select", async () => {
    renderWithProviders(
      <TagProvider>
        <TestComponent />
      </TagProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Tag")); // Select
      fireEvent.click(screen.getByText("Select Tag")); // Unselect
    });
  });

  it("handles api error", async () => {
    jest.spyOn(TagsAPI, "getTags").mockResolvedValue(null);
    renderWithProviders(
      <TagProvider>
        <TestComponent />
      </TagProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Tag"));
    });
  });

  it("handles misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderWithProviders(<TestComponent />)).toThrowError();
  });
});
