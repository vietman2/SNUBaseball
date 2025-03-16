import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";

import { RootLayout } from "@pages/_layout";
import { About } from "@pages/About";
import { GalleryContainer } from "@pages/Gallery";
import { HistoryContainer } from "@pages/History";
import { Home } from "@pages/Home";
import { Members } from "@pages/Members";
import { Staff } from "@pages/Staff";

import { ErrorPage } from "@components/Fallbacks";
import { NavigationProvider } from "@contexts/navigation";
import { ThemeProvider, colors } from "@contexts/theme";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation100.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 100;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation200.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 200;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation300.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 300;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation400.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation500.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation600.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 600;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation700.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation800.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 800;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation900.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 900;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream9.otf') format('opentype');
    font-display: fallback;
    font-weight: 900;
    font-style: normal;
  }
    
  * {
    box-sizing: border-box;
    user-select: none;
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

  div {
    transition: background-color 0.3s ease-in-out;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background: url('/assets/icons/chevron-down.svg') no-repeat 90% 48%;
  }

  select::-ms-expand {
    display: none;
  }

  body {
    margin: 0;
    font-family: 'Freesentation', 'SCDream', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #B1BDCD;
      border-radius: 3px;
      border: 1.5px solid #B1BDCD;
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledThemeProvider theme={{ colors: colors }}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </StyledThemeProvider>
    </>
  );
}

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <NavigationProvider>
              <RootLayout />
            </NavigationProvider>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery/*" element={<GalleryContainer />} />
          <Route path="/history/*" element={<HistoryContainer />} />
          <Route path="/members" element={<Members />} />
          <Route path="/staff" element={<Staff />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
