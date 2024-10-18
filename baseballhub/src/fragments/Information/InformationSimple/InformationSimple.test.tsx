import { InformationSimple } from "./InformationSimple";
import { sampleInformations } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("<InformationSimple />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <InformationSimple information={sampleInformations[0]} />
        <InformationSimple information={sampleInformations[1]} />
      </>
    );
  });
});
