import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => <div>{src}</div>,
}));
jest.mock("next/navigation", () => ({
  useServerInsertedHTML: (cb: () => React.ReactNode) => {
    return cb();
  },
}));

jest.mock("@shared/lib/styled-components", () => ({
  ...jest.requireActual("@shared/lib/styled-components"),
  GlobalStyles: () => <div data-testid="global-styles" />,
  StyledComponentsRegistry: ({ children }: { children: React.ReactNode }) => (
    <div className="styled-components-registry">{children}</div>
  ),
}));

jest.mock("@shared/ui/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}-icon</span>,
  Logo: ({ size }: { size: number }) => <span>logo-{size}</span>,
}));
