import { render } from "@testing-library/react";

import Schedule from "./Schedule";

jest.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
  Route: ({ element }: { element: JSX.Element }) => element,
  Routes: ({ children }: { children: JSX.Element }) => children,
  useNavigate: jest.fn(),
  useRoutes: jest.fn(),
}));
jest.mock("./Events/Events", () => ({
  Events: () => <div data-testid="events" />,
}));
jest.mock("./Games/Games", () => ({
  Games: () => <div data-testid="games" />,
}));
jest.mock("./Main/Main", () => ({
  ScheduleMain: () => <div data-testid="main" />,
}));
jest.mock("./Training/Training", () => ({
  Training: () => <div data-testid="training" />,
}));

describe("<Schedule />", () => {
  it("should render", () => {
    render(<Schedule />);
  });
});
