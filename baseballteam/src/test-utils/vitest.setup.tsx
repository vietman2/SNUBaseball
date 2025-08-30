import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
    isAxiosError: vi.fn().mockReturnValue(true),
  };
});
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet</div>,
    useNavigate: () => vi.fn(),
    useLocation: vi.fn().mockReturnValue({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: "default",
    }),
    useParams: vi.fn(),
  };
});

vi.mock("@shared/lib/auth", async () => {
  const { AuthContext, TokensContext } = await vi.importActual(
    "@shared/lib/auth"
  );

  return {
    AuthContext: AuthContext,
    TokensContext: TokensContext,
    createUserContext: vi.fn().mockReturnValue({
      UserContext: AuthContext,
      useUser: vi.fn().mockReturnValue({
        user: null,
        isAuthenticated: false,
      }),
    }),
    useTokens: vi.fn().mockReturnValue({
      setToken: vi.fn(),
      clearToken: vi.fn(),
    }),
    isTokenValid: vi.fn().mockReturnValue(true),
  };
});
vi.mock("@shared/lib/axios", async () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));
vi.mock("@shared/lib/router", async () => {
  const { TabsContext } = await vi.importActual("@shared/lib/router");

  return {
    TabsContext: TabsContext,
    useTabs: vi.fn().mockReturnValue({
      tabGroups: [],
      activeTab: null,
      activeSubTab: null,
    }),
    getAllTabs: vi.fn().mockReturnValue([]),
    parseCurrentPath: vi.fn().mockReturnValue({
      tab: null,
      subTab: null,
    }),
  };
});
vi.mock("@shared/lib/styles", async () => {
  const { ColorContext, ThemeColorType, light } = await vi.importActual(
    "@shared/lib/styles"
  );

  return {
    ColorContext: ColorContext,
    useColors: vi.fn(() => ({
      colors: light,
      isDarkMode: false,
      toggleTheme: vi.fn(),
    })),
    ThemeColorType: ThemeColorType,
    light: light,
    dark: light,
    GlobalStyles: () => null,
  };
});

vi.mock("@shared/ui/Buttons", () => ({
  ElevatedTextButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button onClick={onClick} className="elevated">
      {children}
    </button>
  ),
  ElevatedLink: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} className="elevated">
      {children}
    </a>
  ),
}));
vi.mock("@shared/ui/Dividers", () => ({
  VerticalDivider: () => <div>VerticalDivider</div>,
}));
vi.mock("@shared/ui/Fallbacks", () => ({
  LoadingSpinner: () => <div>Loading Spinner</div>,
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
}));
vi.mock("@shared/ui/Images", () => ({
  Logo: "url",
  MainLogo: () => <div>Main Logo</div>,
}));
