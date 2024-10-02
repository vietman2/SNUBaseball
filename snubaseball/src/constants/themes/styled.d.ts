import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryContainer: string;
      secondary: string;
      background: string;
    };
  }
}
