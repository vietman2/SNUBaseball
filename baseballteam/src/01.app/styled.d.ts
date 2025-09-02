import "styled-components";

import { ThemeColorType } from "@shared/lib/styles";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColorType;
  }
}
