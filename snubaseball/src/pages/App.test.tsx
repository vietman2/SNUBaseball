import { render } from "@testing-library/react";

import App from "./App";

jest.mock("@pages/_layout", () => ({
  RootLayout: () => <div>RootLayout</div>,
}));
jest.mock("@pages/About", () => ({
  About: () => <div>About</div>,
}));
jest.mock("@pages/Gallery", () => ({
  GalleryContainer: () => <div>GalleryContainer</div>,
}));
jest.mock("@pages/History", () => ({
  HistoryContainer: () => <div>HistoryContainer</div>,
}));
jest.mock("@pages/Home", () => ({
  Home: () => <div>Home</div>,
}));
jest.mock("@pages/Members", () => ({
  Members: () => <div>Members</div>,
}));
jest.mock("@pages/Staff", () => ({
  Staff: () => <div>Staff</div>,
}));
jest.mock("@pages/Terms", () => ({
  Terms: () => <div>Terms</div>,
}));

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
