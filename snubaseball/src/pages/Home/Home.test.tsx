import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { Home } from "./Home";
import { sampleMemories } from "@data/archives";
import * as MemoriesAPI from "@services/archive/memories";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Interviews", () => ({
  Interview: () => <div data-testid="interview" />,
}));
jest.mock("@fragments/Memories", () => ({
  Memories: () => <div data-testid="memories" />,
}));

describe("<Home />", () => {
  const clickLeft = () => fireEvent.click(screen.getByTestId("left"));
  const clickRight = () => fireEvent.click(screen.getByTestId("right"));

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(MemoriesAPI, "getMemories").mockResolvedValue(sampleMemories);
  });

  it("handles sliders and navigations", async () => {
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId("memories")[0]).toBeInTheDocument();
    });

    // Test 3 times to ensure the slider works
    clickLeft();
    clickLeft();
    clickLeft();
    clickRight();
    clickRight();
    clickRight();
    fireEvent.click(screen.getByTestId("more-memories"));
    fireEvent.click(screen.getByTestId("more-interviews"));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });
  });

  it("handles when ref is null and api error", async () => {
    jest
      .spyOn(window, "setInterval")
      .mockReturnValue(0 as unknown as ReturnType<typeof setInterval>);
    jest.spyOn(MemoriesAPI, "getMemories").mockResolvedValue(null);

    renderWithProviders(<Home />);

    waitFor(() => {
      clickLeft();
    });
  });
});
