import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { MainLogo } from "@shared/ui/Images";

vi.unmock("@shared/ui/Images");

describe("<MainLogo />", () => {
  it("should render blue logo", () => {
    render(<MainLogo />);
  });

  it("should render white logo", () => {
    render(<MainLogo color="white" />);
  });
});
