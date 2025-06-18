import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { LoginPage } from "@pages/login";
import { NotFoundPage } from "@pages/notfound";
import { RootLayout } from "@widgets/layout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
