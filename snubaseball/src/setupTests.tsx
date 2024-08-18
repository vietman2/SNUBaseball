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

jest.mock("@components/Buttons", () => ({
  TextButton: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="button" onClick={onClick} />
  ),
}));
jest.mock("@components/Checkbox", () => ({
  Checkbox: "Checkbox",
}));
jest.mock("@components/Dividers", () => ({
  Divider: () => <div data-testid="divider" />,
  TextDivider: ({ text }: { text: string }) => (
    <div data-testid="text-divider">{text}</div>
  ),
}));
jest.mock("@components/Icons", () => ({
  AppIcon: () => <div data-testid="app-icon" />,
}));
jest.mock("@components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock("@components/Sidebar", () => ({
  Sidebar: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div data-testid="sidebar" onClick={toggleSidebar} onKeyDown={jest.fn()} />
  ),
}));
jest.mock("@components/Tables", () => ({
  SimpleTable: "div",
  TableRow: "div",
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({
    tabs,
    setSelectedTab,
  }: {
    tabs: string[];
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
  SubTabs: ({
    tabs,
    selectedTab,
    setSelectedTab,
  }: {
    tabs: string[];
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
  }) => (
    <div data-testid="subtabs">
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
}));
jest.mock("@components/TextInputs", () => ({
  TextInput: ({ value, onChange }: { value: string; onChange: () => void }) => (
    <input
      data-testid="text-input"
      value={value}
      onChange={onChange}
      onKeyDown={jest.fn()}
    />
  ),
}));
jest.mock("@components/Texts", () => ({
  Title: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div data-testid="title">
      {title}
      {subtitle}
    </div>
  ),
  Subtitle: "div",
  Caption: "div",
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
