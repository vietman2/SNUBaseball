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

import { AuthProvider, useAuth } from "@contexts/auth";
import { ThemeProvider, useTheme } from "@contexts/theme";
import { RootLayout } from "@components/RootLayout";
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
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
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
