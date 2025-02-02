import { render } from "@testing-library/react";

import App from "./App";

jest.mock("@pages/_layout", () => ({
  RootLayout: () => <div>RootLayout</div>,
}));
jest.mock("@pages/Home", () => ({
  Home: () => <div>Home</div>,
}));

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
