import { render, waitFor } from "@testing-library/react";
import * as Headers from "next/headers";

import { RootLayout, metadata } from "@app/root";
import { getElementFromAsyncServerComponent } from "@test-utils/renderer";

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockResolvedValue({
    get: jest.fn(),
  }),
}));
jest.mock("@app/root/providers", () => ({
  StylesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock("@app/root/ui/styles", () => ({
  ContentWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock("@widgets/footer", () => ({
  RootFooter: () => <div>Root Footer</div>,
}));
jest.mock("@widgets/header", () => ({
  RootHeader: () => <div>Root Header</div>,
}));

describe("RootLayout", () => {
  it("renders the RootLayout with children (light mode)", async () => {
    (Headers.cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "light" }),
    });
    jest.spyOn(console, "error").mockImplementation(() => {});

    const elements = await getElementFromAsyncServerComponent(RootLayout, {
      children: <div>Test Content</div>,
    });

    const { getByText } = render(elements);

    await waitFor(() => {
      expect(getByText("Test Content")).toBeInTheDocument();
    });
  });

  it("renders the RootLayout with children (dark mode)", async () => {
    (Headers.cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "dark" }),
    });
    jest.spyOn(console, "error").mockImplementation(() => {});

    const elements = await getElementFromAsyncServerComponent(RootLayout, {
      children: <div>Test Content</div>,
    });

    const { getByText } = render(elements);

    await waitFor(() => {
      expect(getByText("Test Content")).toBeInTheDocument();
    });
  });

  it("has correct metadata", () => {
    expect(metadata.title).toBe("서울대 야구부");
    expect(metadata.description).toBe("서울대학교 야구부 공식 홈페이지");
  });
});
