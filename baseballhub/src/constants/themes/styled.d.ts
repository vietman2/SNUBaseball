import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryContainer: string;
      secondary: string;
      offWhite: string;
      lavender: string;
      sapphire: string;
      border: string;
      background: string;
      primaryText: string;
      secondaryText: string;
      accentText: string;
      linkText: string;
    };
  }
}
