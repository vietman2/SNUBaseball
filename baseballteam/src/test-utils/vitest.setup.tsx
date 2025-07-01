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

vi.mock("@widgets/auth", () => ({
  AuthFormWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock("@widgets/layout", () => ({
  RootLayout: () => null,
}));

vi.mock("@shared/lib/auth", async () => {
  const { AuthContext, UserProfileType, sampleCaptain, samplePlayer } =
    await vi.importActual("@shared/lib/auth");

  return {
    AuthContext: AuthContext,
    UserProfileType,
    sampleCaptain,
    samplePlayer,
    useAuth: vi.fn(() => ({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    })),
    useStudentIdCheck: vi.fn(),
    useLogin: vi.fn(),
    useSignup: vi.fn(),
    useTokenRefresh: vi.fn(),
  };
});
vi.mock("@shared/lib/colors", async () => {
  const { ColorContext, ThemeColorType, light } = await vi.importActual(
    "@shared/lib/colors"
  );

  return {
    useColors: vi.fn(() => ({
      colors: light,
      isDarkMode: false,
      toggleTheme: vi.fn(),
    })),
    ColorContext: ColorContext,
    ThemeColorType: ThemeColorType,
    light: light,
    dark: light,
  };
});

vi.mock("@shared/ui/Buttons", () => ({
  TextButton: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`textbutton-${text}`}>
      {text}
    </button>
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
vi.mock("@shared/ui/Inputs", async () => {
  return {
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
        data-testid={`textinput-${placeholder}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});
