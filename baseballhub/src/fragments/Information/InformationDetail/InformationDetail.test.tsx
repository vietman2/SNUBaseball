import { InformationDetail } from "./InformationDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<InformationDetail />", () => {
  it("renders", () => {
    renderWithProviders(
      <InformationDetail informationId={1} goBack={jest.fn()} />
    );
  });
});
