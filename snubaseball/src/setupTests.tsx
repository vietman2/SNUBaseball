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
jest.mock("@assets/images/main1.jpg", () => "main1.jpg");
jest.mock("@assets/images/main2.jpg", () => "main2.jpg");
jest.mock("@assets/images/main3.jpg", () => "main3.jpg");

jest.mock("@components/Dividers", () => ({
  Divider: () => <div>Divider</div>,
}));
jest.mock("@components/Fallbacks", () => ({
  ErrorPage: () => <div>ErrorPage</div>,
  LoadingPage: () => <div>LoadingPage</div>,
}));
jest.mock("@components/Icons", () => ({
  AppIcon: () => <div>AppIcon</div>,
  Logo: () => <div>Logo</div>,
}));

jest.mock("@contexts/gallery", () => ({
  GalleryProvider: ({ children }: { children: React.ReactNode }) => children,
  useGallery: jest.fn().mockReturnValue({
    albums: [],
    currentAlbum: undefined,
    currentMedia: undefined,
    setCurrentAlbum: jest.fn(),
    setCurrentMedia: jest.fn(),
  }),
}));
jest.mock("@contexts/navigation", () => {
  const { tabs } = jest.requireActual("@contexts/navigation");

  return {
    NavigationProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useNavigation: jest.fn().mockReturnValue({
      currentTab: tabs[0],
      tabs: tabs,
      currentSubTab: null,
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
