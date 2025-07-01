import { useMemo } from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { TabsContext, useTabs } from "@shared/lib/navigation";

vi.unmock("@shared/lib/navigation");

const MockComponent = () => {
  const { activeTab, activeSubTab } = useTabs();

  return (
    <div>
      <h1>{activeTab.title}</h1>
      <p>{activeSubTab?.title}</p>
    </div>
  );
};

const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      tabGroups: [],
      activeTab: {
        title: "Test Tab",
        subtabs: [],
        icon: "test-icon",
        path: "/test",
      },
      activeSubTab: { title: "Test SubTab", path: "/test/subtab" },
      setActiveTab: vi.fn(),
      setActiveSubTab: vi.fn(),
    }),
    []
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

describe("useTabs", () => {
  it("should throw an error if used outside of TabsProvider", () => {
    expect(() => render(<MockComponent />)).toThrow();
  });

  it("should return active tab and subtab when used within TabsProvider", () => {
    const { getByText } = render(
      <MockProvider>
        <MockComponent />
      </MockProvider>
    );

    expect(getByText("Test Tab")).toBeInTheDocument();
    expect(getByText("Test SubTab")).toBeInTheDocument();
  });
});
