/**
 * Mobile: 이 크기보다 작으면, 모바일, 이거보다 크면 태블릿
 * Tablet: 이 크기보다 작으면 태블릿, 이거보다 크면 데스크탑
 */

export type BreakPointsType = {
  mobile: string;
  tablet: string;
};

export const breakpoints: BreakPointsType = {
  mobile: "768px",
  tablet: "1440px",
};
