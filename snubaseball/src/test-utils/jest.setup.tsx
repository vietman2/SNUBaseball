import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => <div>{src}</div>,
}));
jest.mock("next/navigation", () => ({
  useServerInsertedHTML: (cb: () => React.ReactNode) => {
    return cb();
  },
  usePathname: () => "/test-path",
}));

jest.mock("@shared/lib/styles", () => ({
  ...jest.requireActual("@shared/lib/styles"),
  GlobalStyles: () => <div data-testid="global-styles" />,
  StyledComponentsRegistry: ({ children }: { children: React.ReactNode }) => (
    <div className="styled-components-registry">{children}</div>
  ),
  useColors: jest.fn().mockReturnValue({ isDarkMode: false, colors: {} }),
}));

jest.mock("@shared/ui/Badge", () => ({
  Badge: ({ label }: { label: string }) => <span>{label}</span>,
}));
jest.mock("@shared/ui/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}-icon</span>,
  Logo: ({ size }: { size: number }) => <span>logo-{size}</span>,
}));
jest.mock("@shared/ui/Images", () => ({
  ImagePlaceholder: () => <div>image-placeholder</div>,
}));
jest.mock("@shared/ui/Loading", () => ({
  Skeleton: () => <div data-testid="skeleton" />,
}));
