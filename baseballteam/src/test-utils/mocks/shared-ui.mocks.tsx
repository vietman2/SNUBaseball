/* eslint-disable @typescript-eslint/no-explicit-any */
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
}));
vi.mock("@shared/ui/Dividers", () => ({
  Divider: () => <div>Divider</div>,
  VerticalDivider: () => <div>VerticalDivider</div>,
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
  Logo: ({ type }: { type: "SILVER" | "BLUE" }) => <div>{type} Logo</div>,
}));
vi.mock("@shared/ui/Inputs", async () => {
  const { DateInput } = await vi.importActual("@shared/ui/Inputs");

  const mockFile = new File(["dummy content"], "example.png", {
    type: "image/png",
  });

  return {
    DateInput,
    PhoneInput: (props: any) => <input data-testid="phone-input" {...props} />,
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
  SimpleSelect: (props: any) => (
    <select data-testid="simple-select" {...props} />
  ),
}));
vi.mock("@shared/ui/Texts", () => ({
  ErrorText: (props: any) => <p {...props} />,
}));
vi.mock("@shared/ui/Tooltips", () => ({
  SimpleTooltip: (props: any) => <div>{props.text}</div>,
}));
