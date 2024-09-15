import { render } from "@testing-library/react";

import App from "./App";

jest.mock("./RootLayout/RootLayout", () => () => <div>Mock RootLayout</div>);
jest.mock("../Home/Home", () => () => <div>Mock Home</div>);
jest.mock("../Archive/Archive", () => () => <div>Mock Archive</div>);
jest.mock("../Sitemap/Sitemap", () => () => <div>Mock Sitemap</div>);
jest.mock("../Ask/Ask", () => () => <div>Mock Ask</div>);
jest.mock("../About/About", () => () => <div>Mock About</div>);
jest.mock("../Schedule/Schedule", () => () => <div>Mock Schedule</div>);

describe("<App />", () => {
  it("should render without crashing", () => {
    render(<App />);
  });
});
