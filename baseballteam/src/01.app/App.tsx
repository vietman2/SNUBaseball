import { AuthProvider, QueryProvider, StylesProvider } from "./providers";
import { AppRouter } from "./router";

export default function App() {
  return (
    <QueryProvider>
      <StylesProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </StylesProvider>
    </QueryProvider>
  );
}
