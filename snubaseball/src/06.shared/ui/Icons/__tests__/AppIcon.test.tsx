import { render } from "@testing-library/react";

import { AppIcon } from "@shared/ui/Icons";

jest.unmock("@shared/ui/Icons");
jest.mock("../files/close.svg", () => () => null);

describe("AppIcon", () => {
  it("should render default icon", () => {
    render(<AppIcon icon="close" />);
  });

  it("should handle invalid icon", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    render(<AppIcon icon="invalid" />);
  });
});
