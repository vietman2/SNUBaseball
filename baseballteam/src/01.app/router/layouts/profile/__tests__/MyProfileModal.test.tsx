import { describe, it } from "vitest";

import { MyProfileModal } from "../MyProfileModal";
import { renderWithProviders } from "@test-utils/renderer";

describe("MyProfileModal", () => {
  it("renders without crashing", () => {
    renderWithProviders(<MyProfileModal />);
  });
});
