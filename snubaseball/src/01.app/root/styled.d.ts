import "styled-components";

import { BreakPointsType, ThemeColorType } from "@shared/lib/styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: BreakPointsType;
    colors: ThemeColorType;
  }
}
