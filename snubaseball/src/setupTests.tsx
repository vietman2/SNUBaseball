// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("(orientation: portrait)"),
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

jest.mock("@components/Dividers", () => ({
  Divider: () => <div data-testid="divider" />,
  TextDivider: ({ text }: { text: string }) => (
    <div data-testid="text-divider">{text}</div>
  ),
}));
jest.mock("@components/Icons", () => ({
  AppIcon: () => <div data-testid="app-icon" />,
}));
jest.mock("@components/Sidebar", () => ({
  Sidebar: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div data-testid="sidebar" onClick={toggleSidebar} onKeyDown={jest.fn()} />
  ),
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({
    tabs,
    selectedTab,
    setSelectedTab,
  }: {
    tabs: string[];
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
  }) => (
    <div data-testid="tabs">
      {tabs.map((tab) => (
        <div
          key={tab}
          data-testid={tab}
          onClick={() => setSelectedTab(tab)}
          onKeyDown={jest.fn()}
        >
          {tab}
        </div>
      ))}
    </div>
  ),
  EmptyTabs: () => <div data-testid="empty-tabs" />,
}));
jest.mock("@components/Texts", () => ({
  Title: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div data-testid="title">
      {title}
      {subtitle}
    </div>
  ),
}));
jest.mock("@components/TopBar", () => ({
  FullTopBar: () => <div data-testid="full-top-bar" />,
  MobileTopbar: ({
    openSidebar,
    navigate,
  }: {
    navigate: (path: string) => void;
    openSidebar: () => void;
  }) => (
    <>
      <div
        data-testid="open-sidebar"
        onClick={openSidebar}
        onKeyDown={jest.fn()}
      />
      <div
        data-testid="sidebar-navigate"
        onClick={() => navigate("asdf")}
        onKeyDown={jest.fn()}
      />
    </>
  ),
}));
jest.mock("@fragments/Archive", () => ({
  Interview: () => <div data-testid="interview" />,
  Memories: () => <div data-testid="memories" />,
}));
