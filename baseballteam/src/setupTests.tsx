// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useLocation: jest.fn(),
    useParams: jest.fn(),
  };
});

jest.mock("@assets/images/logo.png", () => "logo.png");

jest.mock("@components/Buttons", () => ({
  TextButton: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`button-${text}`}>
      {text}
    </button>
  ),
}));
jest.mock("@components/Dividers", () => ({
  Divider: () => <div>Divider</div>,
  VerticalDivider: () => <div>VerticalDivider</div>,
}));
jest.mock("@components/Fallbacks", () => ({
  ComingSoon: () => <div>ComingSoon</div>,
  ErrorComponent: ({
    onRefresh,
    label,
  }: {
    onRefresh: () => void;
    label: string;
  }) => <button onClick={onRefresh}>{label}</button>,
  ErrorPage: () => <div>ErrorPage</div>,
  Loading: () => <div>Loading</div>,
}));
jest.mock("@components/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
  MainLogo: () => <div>MainLogo</div>,
}));
jest.mock("@components/Inputs", () => ({
  TextInput: ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid={`textinput-${placeholder}`}
    />
  ),
}));

jest.mock("@contexts/auth/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: () => ({
    login: jest.fn(),
    setToken: jest.fn(),
    logout: jest.fn(),
  }),
}));
jest.mock("@contexts/theme/ThemeContext", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: () => ({
    toggleTheme: jest.fn(),
    isDarkMode: false,
    colors: {},
  }),
}));
