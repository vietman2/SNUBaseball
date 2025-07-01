import {
  AuthProvider,
  AutoLoginProvider,
  ColorsProvider,
  QueryProvider,
} from "./providers";
import { AppRouter } from "./routers";
import { GlobalStyles } from "./styles";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ColorsProvider>
        <AuthProvider>
          <QueryProvider>
            <AutoLoginProvider>
              <AppRouter />
            </AutoLoginProvider>
          </QueryProvider>
        </AuthProvider>
      </ColorsProvider>
    </>
  );
}
