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

  backgroundDefault: "#FFFFFF", // 순백
  backgroundPaper: "#FDFDFB", // 약간의 베이지 톤
  surfaceElevated: "#FFFFFF", // 카드류 배경

  textPrimary: "#0F0F70", // 브랜드 딥 블루
  textSecondary: "#4B5563", // gray700
  textDisabled: "#9CA3AF", // gray500

  focusOutline: "#0F0F70", // 브랜드 블루 아웃라인
  divider: "#E5E7EB", // gray300
};

export const dark: ThemeColorType = {
  primary: "#FFFFFF", // 다크에서는 흰색을 브랜드 포인트로
  primaryLight: "#E5E5E5", // 살짝 부드러운 흰색 톤
  primaryDark: "#B5B6B6", // 실버 느낌의 톤 다운
  onPrimary: "#0F0F70", // 블루 위의 텍스트 (배경에서 쓰일 경우 대비 색상)
  onPrimaryDisabled: "#888888", // Gray tone

  secondary: "#C5A86F", // 골드 (강조용)
  onSecondary: "#0F0F70", // 골드 위에 블루/네이비

  success: "#81C784", // 밝은 그린 (다크에서도 선명)
  onSuccess: "#0D0D0D",

  warning: "#FFB74D", // 따뜻한 오렌지
  onWarning: "#0D0D0D",

  error: "#E57373", // 밝은 레드
  onError: "#0D0D0D",

  gray100: "#E5E7EB",
  gray200: "#D1D5DB",
  gray300: "#9CA3AF",
  gray400: "#6B7280",
  gray500: "#4B5563",
  gray600: "#374151",
  gray700: "#1F2937",
  gray800: "#111827",
  gray900: "#0A0A0A",

  backgroundDefault: "#0A0A0A", // 거의 블랙
  backgroundPaper: "#111827", // 다크 네이비 느낌
  surfaceElevated: "#1F2937", // 카드나 모달 배경

  textPrimary: "#FFFFFF", // 기본 텍스트는 흰색
  textSecondary: "#B5B6B6", // 실버 톤 (보조 텍스트)
  textDisabled: "#6B7280", // 중간 회색 (gray400)

  focusOutline: "#C5A86F", // 골드 포커스 아웃라인 (강조용)
  divider: "#374151", // 진한 회색
};
