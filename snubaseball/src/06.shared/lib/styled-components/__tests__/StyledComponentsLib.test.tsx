import { render } from "@testing-library/react";

import {
  GlobalStyles,
  StyledComponentsRegistry,
} from "@shared/lib/styled-components";

jest.unmock("@shared/lib/styled-components");

describe("StyledComponentsLib", () => {
  it("renders GlobalStyles without crashing", () => {
    const { container } = render(
      <StyledComponentsRegistry>
        <GlobalStyles />
      </StyledComponentsRegistry>
    );
    expect(container).toBeInTheDocument();
  });
});
