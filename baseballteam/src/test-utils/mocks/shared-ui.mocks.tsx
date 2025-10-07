import { vi } from "vitest";

vi.mock("@shared/ui/Badges", () => ({
  SimpleBadge: ({ label }: { label: string }) => <div>{label}</div>,
}));
vi.mock("@shared/ui/Buttons", () => ({
  DeleteButton: ({
    onClick,
    label = "변경하기",
    testID = "delete-button",
  }: {
    onClick: () => void;
    label: string;
    testID?: string;
  }) => (
    <button onClick={onClick} data-testid={testID}>
      {label}
    </button>
  ),
  EditButton: ({
    onClick,
    label = "변경하기",
    testID = "edit-button",
  }: {
    onClick: () => void;
    label: string;
    testID?: string;
  }) => (
    <button onClick={onClick} data-testid={testID}>
      {label}
    </button>
  ),
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
  }) => (
    <a href={to} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  ),
  TextLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  ),
  SubmitButton: (props: unknown) => (
    <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
  ),
}));
vi.mock("@shared/ui/Dividers", () => ({
  Divider: () => <div>Divider</div>,
  VerticalDivider: () => <div>VerticalDivider</div>,
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <div>{icon}-icon</div>,
  Logo: ({ type }: { type: "SILVER" | "BLUE" }) => <div>{type} Logo</div>,
}));
vi.mock("@shared/ui/Images", () => ({
  ImagePlaceholder: () => <div>ImagePlaceholder</div>,
  ProgressiveImage: () => <div>ProgressiveImage</div>,
}));
vi.mock("@shared/ui/Inputs", async () => {
  const { DateInput } = await vi.importActual("@shared/ui/Inputs");

  return {
    DateInput,
    PhoneInput: (props: unknown) => (
      <input
        data-testid="phone-input"
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    ),
    InlineTextInput: (props: unknown) => (
      <input {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
    ),
  };
});
vi.mock("@shared/ui/Loading", () => ({
  Skeleton: () => <div>Loading Skeleton</div>,
  Spinner: () => <div>Loading Spinner</div>,
}));
vi.mock("@shared/ui/Menus", () => ({
  MenuContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useMenu: vi.fn().mockReturnValue({
    ref: { current: null },
    isOpen: true,
    open: vi.fn(),
    close: vi.fn(),
  }),
}));
vi.mock("@shared/ui/Pagination", () => ({
  Pagination: () => <div>Pagination</div>,
}));
vi.mock("@shared/ui/Pickers", () => ({
  ColorPicker: () => <div>ColorPicker</div>,
  IconPicker: () => <div>IconPicker</div>,
}));
vi.mock("@shared/ui/ProgressBars", () => ({
  ProgressBar: () => <div>ProgressBar</div>,
}));
vi.mock("@shared/ui/Selects", () => {
  const ComponentWithChildren = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>;

  return {
    SelectMenu: () => ({
      Container: ComponentWithChildren,
      ItemsContainer: ComponentWithChildren,
      Placeholder: ComponentWithChildren,
      SelectedArea: ComponentWithChildren,
      Options: ComponentWithChildren,
    }),
    SimpleSelect: (props: unknown) => (
      <select
        data-testid="simple-select"
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
      />
    ),
  };
});
vi.mock("@shared/ui/Texts", () => ({
  ErrorText: (props: unknown) => (
    <p {...(props as React.HTMLAttributes<HTMLParagraphElement>)} />
  ),
  PageTitle: (props: unknown) => (
    <p {...(props as React.HTMLAttributes<HTMLParagraphElement>)} />
  ),
  WarningText: (props: unknown) => (
    <p {...(props as React.HTMLAttributes<HTMLParagraphElement>)} />
  ),
}));
vi.mock("@shared/ui/Tooltips", () => ({
  SimpleTooltip: (props: unknown) => (
    <div>{(props as { text: string }).text}</div>
  ),
  TooltipWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
