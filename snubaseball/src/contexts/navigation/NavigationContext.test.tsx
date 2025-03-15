import { render } from "@testing-library/react";
import * as Router from "react-router-dom";

import { NavigationProvider, useNavigation } from "./NavigationContext";

const TestComponent = () => {
  const { currentTab, currentSubTab } = useNavigation();

  return (
    <div>
      <h1>{currentTab.title}</h1>
      {currentSubTab && <h2>{currentSubTab.title}</h2>}
    </div>
  );
};

describe("NavigationContext", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/",
      hash: "",
      search: "",
      state: null,
      key: "",
    });
  });

  it("handles home", () => {
    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );
  });

  it("handles tab", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/schedule",
      hash: "",
      search: "",
      state: null,
      key: "",
    });

    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );
  });

  it("handles subtab", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/gallery",
      hash: "",
      search: "",
      state: null,
      key: "",
    });

    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );
  });

  it("should handle misuse", () => {
    expect(() => render(<TestComponent />)).toThrow();
  });
});
