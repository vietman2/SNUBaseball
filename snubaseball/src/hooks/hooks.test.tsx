import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useWindowSize } from "./useWindowSize";

const TestComponent = () => {
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
    render(<TestComponent />);
    expect(screen.getByTestId("window-size")).toHaveTextContent("1024 x 768");
  });

  it("should update window size when window resizes", async () => {
    render(<TestComponent />);

    await waitFor(() => {
      resizeWindow(800, 600);
    });
    expect(screen.getByTestId("window-size")).toHaveTextContent("800 x 600");
  });
});
