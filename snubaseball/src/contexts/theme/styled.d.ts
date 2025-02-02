import "styled-components";

export type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  background100: string;
  background300: string;
  background500: string;
  lowEmphasis: string;
  mediumEmphasis: string;
  highEmphasis: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}
