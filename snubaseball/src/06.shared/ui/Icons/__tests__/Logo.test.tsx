import { render } from "@testing-library/react";

import { Logo } from "@shared/ui/Icons";

jest.unmock("@shared/ui/Icons");

describe("Logo", () => {
  it("should render with default size", () => {
    render(<Logo />);
  });

  it("should render with custom size", () => {
    render(<Logo size={48} />);
  });
});
