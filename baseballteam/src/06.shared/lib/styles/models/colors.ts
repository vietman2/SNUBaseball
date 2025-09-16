import type { ThemeColorType } from "./types";

export const light: ThemeColorType = {
  primary: "#0F0F70",
  primaryLight: "#3D3D90",
  primaryDark: "#0B0B50",
  onPrimary: "#FFFFFF",
  onPrimaryDisabled: "#B5B6B6",

  secondary: "#C5A86F", // Gold
  onSecondary: "#FFFFFF", // 금색 위의 텍스트는 흰색

  success: "#4CAF50", // 그린 (표준 성공색)
  onSuccess: "#FFFFFF",

  warning: "#FFB74D", // 따뜻한 오렌지
  onWarning: "#000000",

  error: "#E57373", // 밝은 레드
  onError: "#FFFFFF",

  gray100: "#F3F4F6",
  gray200: "#ECEEF0",
  gray300: "#E5E7EB",
  gray400: "#D1D5DB",
  gray500: "#9CA3AF",
  gray600: "#6B7280",
  gray700: "#4B5563",
  gray800: "#374151",
  gray900: "#1F2937",

  backgroundDefault: "#FFFFFF",
  backgroundPaper: "#E8E6F2",
  surfaceElevated: "#FDFDFB",
  overlay: "#000000",

  textPrimary: "#0F0F70",
  textSecondary: "#4B5563",
  textDisabled: "#9CA3AF",

  focusOutline: "#0F0F70",
  divider: "#E5E7EB",
};

export const dark: ThemeColorType = {
  primary: "#B5B6B6",
  primaryLight: "#D1D5DB",
  primaryDark: "#9CA3AF",
  onPrimary: "#0F0F70",
  onPrimaryDisabled: "#6B7280",

  secondary: "#C5A86F",
  onSecondary: "#111827",

  success: "#81C784", // 밝은 그린 (다크에서도 선명)
  onSuccess: "#0A0A0A",

  warning: "#FFB74D", // 따뜻한 오렌지
  onWarning: "#0A0A0A",

  error: "#E57373", // 밝은 레드
  onError: "#0A0A0A",

  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  backgroundDefault: "#0A0A0A",
  backgroundPaper: "#1F2937",
  surfaceElevated: "#161B22",
  overlay: "#000000",

  textPrimary: "#E5E7EB", // 기본 텍스트는 흰색
  textSecondary: "#B5B6B6", // 실버 톤 (보조 텍스트)
  textDisabled: "#6B7280", // 중간 회색 (gray400)

  focusOutline: "#C5A86F", // 골드 포커스 아웃라인 (강조용)
  divider: "#374151", // 진한 회색
};
