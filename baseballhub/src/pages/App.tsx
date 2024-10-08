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

import { Members } from "@pages/Admin";
import { Login, SignUp } from "@pages/Auth";
import { Board } from "@pages/Forum";
import { GuidelinesContainer } from "@pages/Guidelines";
import { Home } from "@pages/Home";
import { RecordsContainer } from "@pages/Records";
import { ScheduleContainer } from "@pages/Schedule";
import { Feedback, Guidelines, Journals } from "@pages/Training";

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
          <Route path="/home" element={<Home />} />
          <Route path="/records" element={<RecordsContainer />} />
          <Route path="/schedule" element={<ScheduleContainer />} />
          <Route path="/guidelines" element={<GuidelinesContainer />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/forum" element={<Board />} />
          <Route path="/members" element={<Members />} />
        </Route>
      </Route>
    </>
  )
);

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream1.otf') format('opentype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream2.otf') format('opentype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream3.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream4.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream5.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream6.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream7.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream8.otf') format('opentype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'SCDream';
    src: url('/assets/fonts/SCDream9.otf') format('opentype');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/FreesentationVF.ttf') format('truetype');
    font-style: normal;
  }
    
  * {
    box-sizing: border-box;
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
