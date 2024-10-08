import { fireEvent, render, screen } from "@testing-library/react";

import Schedule from "./Schedule";

jest.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
  Route: ({ element }: { element: JSX.Element }) => element,
  Routes: ({ children }: { children: JSX.Element }) => children,
  useNavigate: () => jest.fn(),
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
jest.mock("@components/Tabs", () => ({
  Tabs: ({ setSelectedTab }: { setSelectedTab: (tab: string) => void }) => (
    <>
      <button data-testid="전체" onClick={() => setSelectedTab("전체")} />
      <button data-testid="경기" onClick={() => setSelectedTab("경기")} />
      <button data-testid="훈련" onClick={() => setSelectedTab("훈련")} />
      <button data-testid="행사" onClick={() => setSelectedTab("행사")} />
      <button data-testid="null" onClick={() => setSelectedTab("null")} />
    </>
  ),
}));

describe("<Schedule />", () => {
  it("should render", () => {
    render(<Schedule />);

    fireEvent.click(screen.getByTestId("경기"));
    fireEvent.click(screen.getByTestId("훈련"));
    fireEvent.click(screen.getByTestId("행사"));
    fireEvent.click(screen.getByTestId("전체"));
    fireEvent.click(screen.getByTestId("null"));
  });
});
