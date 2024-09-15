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

jest.mock("@assets/images/logo.png", () => "Logo");
jest.mock("@assets/images/main1.jpg", () => "MainImage1");
jest.mock("@assets/images/main2.jpg", () => "MainImage2");
jest.mock("@assets/images/main3.jpg", () => "MainImage3");

jest.mock("@components/Buttons", () => ({
  TextButton: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="button" onClick={onClick} />
  ),
}));
jest.mock("@components/Checkbox", () => ({
  Checkbox: "div",
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
  LoadingPage: "div",
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
  Tabs: () => <div data-testid="tabs" />,
  EmptyTabs: () => <div data-testid="empty-tabs" />,
  SubTabs: () => <div data-testid="subtabs" />,
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
