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
    <button onClick={onClick} data-testid={`text-button-${text}`}>
      {text}
    </button>
  ),
}));
vi.mock("@shared/ui/Fallbacks", () => ({
  LoadingSpinner: () => <div>Loading Spinner</div>,
}));
vi.mock("@shared/ui/Icons", () => ({
  Logo: () => <div>Mocked Logo</div>,
}));
vi.mock("@shared/ui/Inputs", async () => {
  return {
    TextInput: ({
      label,
      value,
      onChange,
    }: {
      label: string;
      value: string;
      onChange: (value: string) => void;
    }) => (
      <input
        data-testid={`textinput-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});
