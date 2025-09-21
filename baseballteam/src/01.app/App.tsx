import { BrowserRouter } from "react-router";

import {
  AuthProvider,
  QueryProvider,
  RouterProvider,
  StylesProvider,
} from "./providers";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <RouterProvider>
            <StylesProvider>
              <AppRouter />
            </StylesProvider>
          </RouterProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
