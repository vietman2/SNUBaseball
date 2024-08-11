import { MemoryRouter, Route, Routes } from "react-router";

import { AuthProvider } from "./AuthProvider";
import { renderWithProviders } from "@utils/test-utils";

function Child() {
  return <div>child</div>;
}

describe("<AuthRoute />", () => {
  it("should render", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <Child />
              </AuthProvider>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );
  });
});
