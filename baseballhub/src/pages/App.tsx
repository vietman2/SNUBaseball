import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";

import { AccountingsContainer } from "@pages/Accountings";
import { AdminContainer } from "@pages/Admin";
import { Login, SignUp } from "@pages/Auth";
import { ForumContainer } from "@pages/Forum";
import { GuidelinesContainer } from "@pages/Guidelines";
import { HomeContainer } from "@pages/Home";
import { ManagementContainer } from "@pages/Management";
import { NotesContainer } from "@pages/Notes";
import { RecordsContainer } from "@pages/Records";
import { ScheduleContainer } from "@pages/Schedule";

import { RootLayout } from "@components/RootLayout";
import { AuthProvider, useAuth } from "@contexts/auth";
import { ThemeProvider, useTheme } from "@contexts/theme";
import { dark, light } from "@themes/themeColors";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<RootLayout />}>
          <Route path="/home" element={<HomeContainer />} />
          <Route path="/records" element={<RecordsContainer />} />
          <Route path="/forum" element={<ForumContainer />} />
          <Route path="/schedule" element={<ScheduleContainer />} />
          <Route path="/notes" element={<NotesContainer />} />
          <Route path="/guidelines" element={<GuidelinesContainer />} />
          <Route path="/management" element={<ManagementContainer />} />
          <Route path="/admin" element={<AdminContainer />} />
          <Route path="/accountings" element={<AccountingsContainer />} />
        </Route>
      </Route>
    </>
  )
);

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
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </>
  );
}

function ThemedApp() {
  const { isDarkMode } = useTheme();

  return (
    <StyledThemeProvider theme={{ colors: isDarkMode ? dark : light }}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StyledThemeProvider>
  );
}
