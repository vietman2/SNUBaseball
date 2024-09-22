import "styled-components";
import { MyTheme } from "./themeColors";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryContainer: string;
      secondary: string;
      offWhite: string;
      sapphire: string;
      border: string;
    };
  }
}
