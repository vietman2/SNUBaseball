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
      <RouterProvider>
        <QueryProvider>
          <StylesProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </StylesProvider>
        </QueryProvider>
      </RouterProvider>
    </BrowserRouter>
  );
}
