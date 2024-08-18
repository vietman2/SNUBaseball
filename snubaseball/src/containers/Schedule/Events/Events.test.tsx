import { fireEvent, render, screen } from "@testing-library/react";

import { Events } from "./Events";

jest.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
  Route: ({ element }: { element: JSX.Element }) => element,
  Routes: ({ children }: { children: JSX.Element }) => children,
  Navigate: () => <div data-testid="outlet" />,
  useNavigate: () => jest.fn(),
  useRoutes: jest.fn(),
}));
jest.mock("./Closing/Closing", () => ({
  Closing: "div",
}));
jest.mock("./Homecoming/Homecoming", () => ({
  Homecoming: "div",
}));
jest.mock("./Graduation/Graduation", () => ({
  Graduation: "div",
}));
jest.mock("@components/Tabs", () => ({
  SubTabs: ({ setSelectedTab }: { setSelectedTab: (tab: string) => void }) => (
    <>
      <div
        data-testid="OB전"
        onClick={() => setSelectedTab("OB전")}
        onKeyDown={jest.fn()}
      />
      <div
        data-testid="종무식"
        onClick={() => setSelectedTab("종무식")}
        onKeyDown={jest.fn()}
      />
      <div
        data-testid="졸업식"
        onClick={() => setSelectedTab("졸업식")}
        onKeyDown={jest.fn()}
      />
      <div
        data-testid="null"
        onClick={() => setSelectedTab("null")}
        onKeyDown={jest.fn()}
      />
    </>
  ),
}));

describe("Events", () => {
  it("should render", () => {
    render(<Events />);

    fireEvent.click(screen.getByTestId("종무식"));
    fireEvent.click(screen.getByTestId("졸업식"));
    fireEvent.click(screen.getByTestId("OB전"));
    fireEvent.click(screen.getByTestId("null"));
  });
});
