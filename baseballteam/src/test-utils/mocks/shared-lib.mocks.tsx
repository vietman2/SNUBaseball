import { vi } from "vitest";

vi.mock("@entities/user", async () => {
  const actual = await vi.importActual("@entities/user");
  return {
    ...actual,
    useUser: vi
      .fn()
      .mockReturnValue({ user: actual.sampleUser, isAuthenticated: true }),
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
    patch: vi.fn(),
    delete: vi.fn(),
  },
  axiosInstanceWithAuth: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
  setAutoRetryAfterTokenRefresh: vi.fn(),
  serverErrorMessageParser: vi.fn().mockReturnValue({
    status: "ERROR",
    message: "Sample Error Message",
  }),
}));
vi.mock("@shared/lib/formatters", async () => ({
  formatPhoneKR: (phone: string) => phone,
}));
vi.mock("@shared/lib/router", async () => {
  const { RouterContext, MyModalTabs } = await vi.importActual(
    "@shared/lib/router"
  );

  return {
    RouterContext: RouterContext,
    MyModalTabs: MyModalTabs,
    isEqual: vi.fn().mockReturnValue(true),
    useRouter: vi.fn().mockReturnValue({
      backgroundLocation: {
        pathname: "/home",
        search: "",
        hash: "",
        state: null,
        key: "",
      },
      displayLocation: {
        pathname: "/home",
        search: "",
        hash: "",
        state: null,
        key: "",
      },
      isModal: false,
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
