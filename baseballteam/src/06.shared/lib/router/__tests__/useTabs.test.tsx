import { useMemo } from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { TabsContext, useTabs } from "@shared/lib/router";

vi.unmock("@shared/lib/router");

const MockComponent = () => {
  const { activeTab, activeSubTab } = useTabs();

  return (
    <div>
      <h1>{activeTab?.title}</h1>
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
        href: "/test",
      },
      activeSubTab: { title: "Test SubTab", href: "/test/subtab" },
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
