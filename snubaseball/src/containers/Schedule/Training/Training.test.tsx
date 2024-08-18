import { fireEvent, render, screen } from "@testing-library/react";

import { Training } from "./Training";

jest.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
  Route: ({ element }: { element: JSX.Element }) => element,
  Routes: ({ children }: { children: JSX.Element }) => children,
  Navigate: () => <div data-testid="outlet" />,
  useNavigate: () => jest.fn(),
  useRoutes: jest.fn(),
}));
jest.mock("./Monthly/Monthly", () => ({
  Monthly: "div",
}));
jest.mock("./Summer/Summer", () => ({
  Summer: "div",
}));
jest.mock("./Winter/Winter", () => ({
  Winter: "div",
}));
jest.mock("@components/Tabs", () => ({
  SubTabs: ({ setSelectedTab }: { setSelectedTab: (tab: string) => void }) => (
    <>
      <div data-testid="월별 훈련 일정" onClick={() => setSelectedTab("월별 훈련 일정")} />
      <div data-testid="제주도 전지훈련" onClick={() => setSelectedTab("제주도 전지훈련")} />
      <div data-testid="여름 합숙훈련" onClick={() => setSelectedTab("여름 합숙훈련")} />
      <div data-testid="null" onClick={() => setSelectedTab("null")} />
    </>
  ),
}));

describe("Training", () => {
  it("should render", () => {
    render(<Training />);

    fireEvent.click(screen.getByTestId("제주도 전지훈련"));
    fireEvent.click(screen.getByTestId("여름 합숙훈련"));
    fireEvent.click(screen.getByTestId("월별 훈련 일정"));
    fireEvent.click(screen.getByTestId("null"));
  });
});
