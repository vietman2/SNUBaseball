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
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("@components/Icons", () => ({
  AppIcon: () => <div data-testid="app-icon" />,
}));
jest.mock("@components/Sidebar", () => ({
  Sidebar: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div data-testid="sidebar" onClick={toggleSidebar} onKeyDown={jest.fn()} />
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
