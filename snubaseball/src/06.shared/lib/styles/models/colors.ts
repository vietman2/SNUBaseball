export type ThemeColorType = {
  // semantic
  primary: string;
  onPrimary: string;

  secondary: string;
  onSecondary: string;

  gray100: string;
  gray300: string;
  gray500: string;
  gray700: string;
  gray900: string;

  background: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;

  // State
  focusOutline: string;
  divider: string;
};

export const light: ThemeColorType = {
  primary: "#0F0F70",
  onPrimary: "#FFFFFF",

  secondary: "#C5A86F", // Gold
  onSecondary: "#FFFFFF", // 금색 위의 텍스트는 흰색

  gray100: "#F3F4F6",
  gray300: "#E5E7EB",
  gray500: "#9CA3AF",
  gray700: "#4B5563",
  gray900: "#111827",

  background: "#FFFFFF", // 순백

  textPrimary: "#111827",
  textSecondary: "#4B5563", // gray700
  textDisabled: "#9CA3AF", // gray500

  focusOutline: "#0F0F70", // 브랜드 블루 아웃라인
  divider: "#E5E7EB", // gray300
};

export const dark: ThemeColorType = {
  primary: "#C5A86F", // 다크에서는 흰색을 브랜드 포인트로
  onPrimary: "#1A1A1A", // 블루 위의 텍스트 (배경에서 쓰일 경우 대비 색상)

  secondary: "#4F46E5", // 골드 (강조용)
  onSecondary: "#ffffff", // 골드 위에 블루/네이비

  gray100: "#2A2A2A",
  gray300: "#3A3A3A",
  gray500: "#5C5C5C",
  gray700: "#8A8A8A",
  gray900: "#E0E0E0",

  background: "#1A1A1A",

  textPrimary: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textDisabled: "#6B7280",

  focusOutline: "#C5A86F",
  divider: "#374151",
};
