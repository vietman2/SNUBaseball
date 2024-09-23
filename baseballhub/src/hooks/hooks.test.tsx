import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useOrientation } from "./useOrientation";
import { useWindowSize } from "./useWindowSize";

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

const TestComponent2 = () => {
  const { width, height } = useWindowSize();
  return (
    <div data-testid="window-size">
      {width} x {height}
    </div>
  );
};

describe("useWindowSize", () => {
  const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };

  it("should return initial window size", () => {
    render(<TestComponent2 />);
    expect(screen.getByTestId("window-size")).toHaveTextContent("1024 x 768");
  });

  it("should update window size when window resizes", async () => {
    render(<TestComponent2 />);

    await waitFor(() => {
      resizeWindow(800, 600);
    });
    expect(screen.getByTestId("window-size")).toHaveTextContent("800 x 600");
  });
});
