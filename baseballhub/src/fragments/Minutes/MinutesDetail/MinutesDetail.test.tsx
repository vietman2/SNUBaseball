import { MinutesDetail } from "./MinutesDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<MinutesDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<MinutesDetail minutesId={1} goBack={jest.fn()} />);
  });
});
