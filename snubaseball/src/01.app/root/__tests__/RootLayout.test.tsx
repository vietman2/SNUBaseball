import { render } from "@testing-library/react";

import { RootLayout, metadata } from "@app/root";

jest.mock("@app/root/providers", () => ({
  StylesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock("@widgets/header", () => ({
  RootHeader: () => <div>Root Header</div>,
}));

describe("RootLayout", () => {
  it("renders the RootLayout with children", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    const { container, getByText } = render(
      <RootLayout>Test Content</RootLayout>
    );

    expect(container).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct metadata", () => {
    expect(metadata.title).toBe("서울대 야구부");
    expect(metadata.description).toBe("서울대학교 야구부 공식 홈페이지");
  });
});
