import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useOrientation } from "./useOrientation";

const TestComponent = () => {
  const orientation = useOrientation();
  return <div data-testid="orientation">{orientation}</div>;
};

describe("useOrientation", () => {
  const mockMatchMedia = (matches: boolean) => {
    return jest.fn().mockImplementation(() => ({
      matches,
      media: "(orientation: portrait)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  };

  it("should return 2 for portrait orientation", () => {
    window.matchMedia = mockMatchMedia(true);
    render(<TestComponent />);
    expect(screen.getByTestId("orientation")).toHaveTextContent("2");
  });

  it("should return 1 for landscape orientation", () => {
    window.matchMedia = mockMatchMedia(false);
    render(<TestComponent />);
    expect(screen.getByTestId("orientation")).toHaveTextContent("1");
  });

  it("should update orientation when orientation changes", async () => {
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true, // initial portrait
      media: "(orientation: portrait)",
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    }));

    render(<TestComponent />);
    expect(screen.getByTestId("orientation")).toHaveTextContent("2");

    await waitFor(() => {
    window.matchMedia = mockMatchMedia(false);
    addEventListenerMock.mock.calls[0][1](); // Trigger event listener
    });

    expect(screen.getByTestId("orientation")).toHaveTextContent("1");
  });
});
