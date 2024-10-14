import { MinutesSimple } from "./MinutesSimple";
import { sampleMinutes } from "@data/admin";
import { renderWithProviders } from "@utils/test-utils";

describe("<MinutesSimple />", () => {
  it("renders correctly", () => {
    const { container } = renderWithProviders(
      <MinutesSimple minutes={sampleMinutes[0]} />
    );
  });
});
