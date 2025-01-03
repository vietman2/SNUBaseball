import "styled-components";

export type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  background100: string;
  background200: string;
  background300: string;
  background500: string;
  background700: string;
  background900: string;
  foreground900: string;
  foreground700: string;
  foreground500: string;
  foreground300: string;
  foreground100: string;
  borderLight: string;
  borderDark: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}
