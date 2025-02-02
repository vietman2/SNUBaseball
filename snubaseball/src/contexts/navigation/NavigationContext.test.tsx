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
  it("should provide the current tab and subtab", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/about/history",
      state: null,
      key: "",
      hash: "",
      search: "",
    });

    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );
  });

  it("should provide the current tab only", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/",
      state: null,
      key: "",
      hash: "",
      search: "",
    });

    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );
  });

  it("should handle non-existant tab", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/404",
      state: null,
      key: "",
      hash: "",
      search: "",
    });

    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );
  });

  it("should handle non-existant subtab", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/about/404",
      state: null,
      key: "",
      hash: "",
      search: "",
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
