import { MinutesSimple } from "./MinutesSimple";
import { sampleMinutes } from "@data/team";
import { renderWithProviders } from "@utils/test-utils";

describe("<MinutesSimple />", () => {
  it("renders", () => {
    renderWithProviders(<MinutesSimple minutes={sampleMinutes[0]} />);
  });
});
