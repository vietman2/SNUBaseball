export type ThemeColorType = {
  // semantic
  primary: string;
  onPrimary: string;

  secondary: string;
  onSecondary: string;

  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
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
  gray200: "#ECEEF0",
  gray300: "#E5E7EB",
  gray400: "#D1D5DB",
  gray500: "#9CA3AF",
  gray600: "#6B7280",
  gray700: "#4B5563",
  gray800: "#374151",
  gray900: "#1F2937",

  background: "#FFFFFF", // 순백

  textPrimary: "#0F0F70", // 브랜드 딥 블루
  textSecondary: "#4B5563", // gray700
  textDisabled: "#9CA3AF", // gray500

  focusOutline: "#0F0F70", // 브랜드 블루 아웃라인
  divider: "#E5E7EB", // gray300
};

export const dark: ThemeColorType = {
  primary: "#FFFFFF", // 다크에서는 흰색을 브랜드 포인트로
  onPrimary: "#0F0F70", // 블루 위의 텍스트 (배경에서 쓰일 경우 대비 색상)

  secondary: "#C5A86F", // 골드 (강조용)
  onSecondary: "#0F0F70", // 골드 위에 블루/네이비

  gray100: "#E5E7EB",
  gray200: "#D1D5DB",
  gray300: "#9CA3AF",
  gray400: "#6B7280",
  gray500: "#4B5563",
  gray600: "#374151",
  gray700: "#1F2937",
  gray800: "#111827",
  gray900: "#0A0A0A",

  background: "#0A0A0A", // 거의 블랙

  textPrimary: "#FFFFFF", // 기본 텍스트는 흰색
  textSecondary: "#B5B6B6", // 실버 톤 (보조 텍스트)
  textDisabled: "#6B7280", // 중간 회색 (gray400)

  focusOutline: "#C5A86F", // 골드 포커스 아웃라인 (강조용)
  divider: "#374151", // 진한 회색
};
