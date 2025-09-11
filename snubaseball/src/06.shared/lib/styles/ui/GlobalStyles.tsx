import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
    
  body {
    margin: 0;
    font-family: var(--font-noto-sans-kr), var(--font-geist-sans), var(--font-nanum-myeongjo), -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    user-select: none;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #B1BDCD;
      border-radius: 3px;
      border: 1.5px solid #B1BDCD;
    }

    transition: background-color 0.3s, color 0.3s;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
