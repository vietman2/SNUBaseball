import { render } from "@testing-library/react";

import * as StylesAPI from "@shared/lib/styles";
import { Logo } from "@shared/ui/Icons";

jest.unmock("@shared/ui/Icons");

describe("Logo", () => {
  it("should render with default size", () => {
    render(<Logo />);
  });

  it("should render with custom size", () => {
    render(<Logo size={48} />);
  });

  it("should render with dark mode", () => {
    jest.spyOn(StylesAPI, "useColors").mockReturnValue({
      colors: StylesAPI.dark,
      isDarkMode: true,
    });

    render(<Logo size={48} />);
  });
});
