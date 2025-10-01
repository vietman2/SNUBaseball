import "styled-components";

import { BreakPointsType, ThemeColorType } from "@shared/lib/styles";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColorType;
    breakpoints: BreakPointsType;
  }
}
