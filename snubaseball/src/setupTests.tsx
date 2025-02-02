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

jest.mock("@components/Fallbacks", () => ({
  ErrorPage: () => <div>ErrorPage</div>,
}));
jest.mock("@components/Icons", () => ({
  AppIcon: () => <div>AppIcon</div>,
  Logo: () => <div>Logo</div>,
}));

jest.mock("@contexts/navigation", () => {
  const { tabs } = jest.requireActual("@contexts/navigation/tabs");

  return {
    NavigationProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useNavigation: jest.fn().mockReturnValue({
      currentTab: tabs[0],
      tabs: tabs,
    }),
    tabs,
  };
});
jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: jest.fn().mockReturnValue({
    colors: {
      primary: "primary",
      secondary: "secondary",
      tertiary: "tertiary",
      background100: "background100",
      background300: "background300",
      background500: "background500",
      lowEmphasis: "lowEmphasis",
      mediumEmphasis: "mediumEmphasis",
      highEmphasis: "highEmphasis",
    },
  }),
  colors: {
    primary: "primary",
    secondary: "secondary",
    tertiary: "tertiary",
    background100: "background100",
    background300: "background300",
    background500: "background500",
    lowEmphasis: "lowEmphasis",
    mediumEmphasis: "mediumEmphasis",
    highEmphasis: "highEmphasis",
  },
}));
