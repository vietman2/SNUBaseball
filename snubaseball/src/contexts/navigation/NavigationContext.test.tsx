import { render } from "@testing-library/react";

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
  it("should handle context use", () => {
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
