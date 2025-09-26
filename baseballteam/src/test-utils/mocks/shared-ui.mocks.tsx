import { vi } from "vitest";

vi.mock("@shared/ui/Buttons", () => ({
  EditButton: ({
    onClick,
    label = "변경하기",
  }: {
    onClick: () => void;
    label: string;
  }) => <button onClick={onClick}>{label}</button>,
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
}));
vi.mock("@shared/ui/Inputs", async () => {
  const { DateInput } = await vi.importActual("@shared/ui/Inputs");

  const mockFile = new File(["dummy content"], "example.png", {
    type: "image/png",
  });

  return {
    DateInput,
    PhoneInput: (props: unknown) => (
      <input
        data-testid="phone-input"
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    ),
    SingleFileInput: ({
      onChange,
    }: {
      onChange: (file: File | null) => void;
    }) => (
      <button data-testid="file-input" onClick={() => onChange(mockFile)} />
    ),
  };
});
vi.mock("@shared/ui/Loading", () => ({
  Skeleton: () => <div>Loading Skeleton</div>,
  Spinner: () => <div>Loading Spinner</div>,
}));
vi.mock("@shared/ui/Selects", () => ({
  SingleSelectMenu: () => <div>SelectMenu</div>,
  MultiSelectMenu: () => <div>MultiSelectMenu</div>,
  SimpleSelect: (props: unknown) => (
    <select
      data-testid="simple-select"
      {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
    />
  ),
}));
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
}));
