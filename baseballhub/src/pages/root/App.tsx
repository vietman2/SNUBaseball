import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { Members } from "@pages/Admin";
import { AuthProvider, Login, SignUp, useAuth } from "@pages/Auth";
import { Board } from "@pages/Forum";
import { Home } from "@pages/Home";
import { RecordsContainer } from "@pages/Records";
import { ScheduleContainer } from "@pages/Schedule";
import { Feedback, Guidelines, Journals } from "@pages/Training";

import { RootLayout } from "@components/RootLayout";
import { light } from "@themes/themeColors";

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
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/training/journals" element={<Journals />} />
          <Route path="/training/feedback" element={<Feedback />} />
          <Route path="/forum/board" element={<Board />} />
          <Route path="/admin/members" element={<Members />} />
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
      <ThemeProvider theme={{ colors: light }}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
