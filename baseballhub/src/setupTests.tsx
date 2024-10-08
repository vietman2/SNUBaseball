// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  const mockNavigate = jest.fn();
  return {
    ...jest.requireActual("react-router-dom"),
    Navigate: (props: any) => {
      mockNavigate(props.to);
      return null;
    },

    useNavigate: () => mockNavigate,
  };
});

jest.mock("@assets/images/logo.png", () => "logo.png");

jest.mock("@components/Bases", () => ({
  Bases: () => <div>Bases</div>,
}));
jest.mock("@components/Buttons", () => ({
  TextButton: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`button-${text}`}>
      {text}
    </button>
  ),
}));
jest.mock("@components/Chips", () => ({
  Chip: ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={label}>
      {label}
    </button>
  ),
}));
jest.mock("@components/Frames", () => ({
  IFrame: () => <div>IFrame</div>,
}));
jest.mock("@components/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
  MainLogo: () => <div>MainLogo</div>,
}));
jest.mock("@components/Inputs", () => ({
  DateInput: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => <input value={value} onChange={(e) => onChange(e.target.value)} />,
  TextInput: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => <input value={value} onChange={(e) => onChange(e.target.value)} />,
}));
jest.mock("@components/Menus", () => ({
  MenuList: () => <div>MenuList</div>,
}));
jest.mock("@components/Modals", () => ({
  NewMemberModal: ({ onClose }: { onClose: () => void }) => (
    <div onClick={onClose} data-testid="close" onKeyDown={() => {}}>
      NewMemberModal
    </div>
  ),
}));
jest.mock("@components/Progressbars", () => ({
  Statsbar: () => <div>Statsbar</div>,
}));
jest.mock("@components/RootLayout", () => ({
  RootLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock("@components/Selectors", () => ({
  ChipSelector: () => <div>ChipSelector</div>,
  CollegeSelector: () => <div>CollegeSelector</div>,
  SimpleSelector: () => <div>SimpleSelector</div>,
}));
jest.mock("@components/Tables", () => ({
  DailyTable: () => <div>DailyTable</div>,
  MembersTable: () => <div>MembersTable</div>,
  WeeklyTable: () => <div>WeeklyTable</div>,
}));
jest.mock("@components/Tabs", () => ({
  ExpandableTab: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Tabs: () => <div>Tabs</div>,
}));
jest.mock("@components/Texts", () => ({
  Callout: () => <div>Callout</div>,
  Subtitle: () => <div>Subtitle</div>,
  Title: () => <div>Title</div>,
}));
jest.mock("@contexts/auth/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
  })
}));
jest.mock("@contexts/theme/ThemeContext", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: () => ({
    toggleTheme: jest.fn(),
    isDarkMode: false,
  }),
}));
