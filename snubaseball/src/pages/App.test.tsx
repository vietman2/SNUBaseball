import { render } from "@testing-library/react";

import App from "./App";

jest.mock("@pages/_layout", () => ({
  RootLayout: () => <div>RootLayout</div>,
}));
jest.mock("@pages/About", () => ({
  AboutContainer: () => <div>AboutContainer</div>,
}));
jest.mock("@pages/Archive", () => ({
  ArchiveContainer: () => <div>ArchiveContainer</div>,
}));
jest.mock("@pages/Home", () => ({
  Home: () => <div>Home</div>,
}));

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
