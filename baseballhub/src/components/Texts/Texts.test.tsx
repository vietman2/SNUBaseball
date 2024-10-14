import { Subtitle, Title } from "./Title";
import { renderWithProviders } from "@utils/test-utils";

describe("<Subtitle />", () => {
  it("renders small subtitle correctly", () => {
    renderWithProviders(<Subtitle>Hello, world!</Subtitle>);
  });

  it("renders large subtitle correctly", () => {
    renderWithProviders(<Subtitle size="large">Hello, world!</Subtitle>);
  });
});

describe("<Title />", () => {
  it("renders title correctly", () => {
    renderWithProviders(<Title>Hello, world!</Title>);
  });
});
