import { render } from "@testing-library/react";

import { StylesProvider } from "@app/root/providers";

describe("StylesProvider", () => {
  it("should render as darkmode", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
      })),
    });

    const { container } = render(
      <StylesProvider initialDark>
        <div>Test</div>
      </StylesProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it("should render as lightmode", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
      })),
    });

    const { container } = render(
      <StylesProvider initialDark={false}>
        <div>Test</div>
      </StylesProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it("should render as default mode (light)", () => {
    delete (window as Partial<Window>).matchMedia;

    const { container } = render(
      <StylesProvider initialDark={false}>
        <div>Test</div>
      </StylesProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
