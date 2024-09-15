import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Home } from "@pages/Home";
import { Members } from "@pages/Admin";
import { AuthProvider, Login, SignUp, useAuth } from "@pages/Auth";
import { Board } from "@pages/Forum";
import { Results } from "@pages/Records";
import { Daily, Weekly } from "@pages/Schedule";
import { Feedback, Guidelines, Journals } from "@pages/Training";

import { RootLayout } from "@components/RootLayout";

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
          <Route path="/records/results" element={<Results />} />
          <Route path="/schedule/daily" element={<Daily />} />
          <Route path="/schedule/weekly" element={<Weekly />} />
          <Route path="/training/guidelines" element={<Guidelines />} />
          <Route path="/training/journals" element={<Journals />} />
          <Route path="/training/feedback" element={<Feedback />} />
          <Route path="/forum/board" element={<Board />} />
          <Route path="/admin/members" element={<Members />} />
        </Route>
      </Route>
    </>
  )
);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
