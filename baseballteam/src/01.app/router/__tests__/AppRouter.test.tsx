import { describe, expect, it, vi } from "vitest";

import { AppRouter } from "../AppRouter";
import * as RouterAPI from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../auth/routes", () => ({
  AuthRoutes: () => <div>Auth Routes</div>,
}));
vi.mock("../main/routes", () => ({
  MainRoutes: () => <div>Modal Layout</div>,
}));
vi.mock("../modals/routes", () => ({
  ModalRoutes: () => <div>My Profile Modal</div>,
}));

describe("AppRouter", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProviders(<AppRouter />);
    expect(container).toBeInTheDocument();
  });

  it("should render with modal", () => {
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      backgroundLocation: {
        pathname: "/home",
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
