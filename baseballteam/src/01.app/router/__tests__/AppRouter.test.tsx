import { describe, expect, it, vi } from "vitest";
import { Route } from "react-router";

import { AppRouter } from "../AppRouter";
import * as RouterAPI from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../auth/routes", () => ({
  AuthRoutes: <Route path="" element={<div>Auth Layout</div>} />,
}));
vi.mock("../main/routes", () => ({
  MainRoutes: <Route path="home" element={<div>Main Layout</div>} />,
}));
vi.mock("../modals/routes", () => ({
  ModalRoutes: <Route path="" element={<div>Modal Content</div>} />,
}));

describe("AppRouter", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProviders(<AppRouter />);
    expect(container).toBeInTheDocument();
  });

  it("should render with modal", () => {
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      backgroundLocation: {
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "",
      },
      displayLocation: {
        pathname: "/home",
        search: "",
        hash: "",
        state: null,
        key: "",
      },
      isModal: true,
    });

    renderWithProviders(<AppRouter />);
  });
});
