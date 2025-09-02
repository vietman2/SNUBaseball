/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { vi } from "vitest";

const __bcListeners = new Set<(e: MessageEvent) => void>();
vi.stubGlobal(
  "BroadcastChannel",
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    addEventListener(type: string, cb: (e: MessageEvent) => void) {
      if (type === "message") __bcListeners.add(cb);
    }
    removeEventListener(type: string, cb: (e: MessageEvent) => void) {
      if (type === "message") __bcListeners.delete(cb);
    }
    postMessage(data: any) {
      const evt = { data } as MessageEvent;
      __bcListeners.forEach((cb) => cb(evt));
    }
    close() {
      /* no-op for test purposes */
    }
  } as any
);
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
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
    useLocation: vi.fn().mockReturnValue({ pathname: "/home" }),
  };
});

vi.mock("@entities/user", async () => {
  const actual = await vi.importActual("@entities/user");
  return {
    ...actual,
    useUser: vi.fn().mockReturnValue({ user: null, isAuthenticated: false }),
  };
});

vi.mock("@shared/lib/auth", async () => {
  const { TokensContext, createUserContext } = await vi.importActual(
    "@shared/lib/auth"
  );

  return {
    TokensContext: TokensContext,
    createUserContext: createUserContext,
    useTokens: vi.fn().mockReturnValue({
      setToken: vi.fn(),
      clearToken: vi.fn(),
    }),
  };
});
vi.mock("@shared/lib/axios", async () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  axiosInstanceWithAuth: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
  setAutoRetryAfterTokenRefresh: vi.fn(),
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

vi.mock("@shared/ui/Buttons", async () => {
  const { Link } = await vi.importActual("react-router");

  return {
    ElevatedTextButton: ({
      $backgroundColor,
      $color,
      ...props
    }: {
      $backgroundColor: string;
      $color: string;
    }) => (
      <button
        {...props}
        style={{ backgroundColor: $backgroundColor, color: $color }}
      />
    ),
    ElevatedLink: ({
      to,
      children,
    }: {
      to: string;
      children: React.ReactNode;
    }) => <Link to={to}>{children}</Link>,
  };
});
vi.mock("@shared/ui/Dividers", () => ({
  Divider: () => <div>Divider</div>,
  VerticalDivider: () => <div>VerticalDivider</div>,
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
  Logo: () => <div>Logo</div>,
  LogoHorizontal: () => <div>LogoHorizontal</div>,
}));
vi.mock("@shared/ui/Loading", () => ({
  Spinner: () => <div>Loading Spinner</div>,
}));
