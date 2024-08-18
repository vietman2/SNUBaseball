import { render } from "@testing-library/react";

import App from "./App";

jest.mock("./RootLayout/RootLayout", () => () => <div>Mock RootLayout</div>);
jest.mock("containers/Home/Home", () => "Home");
jest.mock("containers/Archive/Archive", () => "Archive");
jest.mock("containers/Sitemap/Sitemap", () => "Sitemap");
jest.mock("containers/Ask/Ask", () => "Ask");
jest.mock("containers/About/About", () => "About");
jest.mock("containers/Schedule/Schedule", () => "Schedule");

describe("<App />", () => {
  it("should render without crashing", () => {
    render(<App />);
  });
});
