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
    useLocation: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock("@shared/lib/auth", async () => {
  const { AuthContext, UserProfileType, refresh, sampleCaptain, samplePlayer } =
    await vi.importActual("@shared/lib/auth");

  return {
    AuthContext: AuthContext,
    UserProfileType,
    refresh,
    sampleCaptain,
    samplePlayer,
    useAuth: vi.fn(() => ({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    })),
  };
});
vi.mock("@shared/lib/colors", async () => {
  const { ColorContext, ThemeColorType, light } = await vi.importActual(
    "@shared/lib/colors"
  );

  return {
    useColors: vi.fn(() => ({
      colors: light,
      toggleTheme: vi.fn(),
    })),
    ColorContext: ColorContext,
    ThemeColorType: ThemeColorType,
    light: light,
    dark: light,
  };
});
