import {
  InformationSimpleWide,
  InformationSimpleWideHeader,
} from "./InformationSimpleWide";
import { sampleInformations } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("<InformationSimpleWide />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <InformationSimpleWide information={sampleInformations[0]} />
        <InformationSimpleWide information={sampleInformations[1]} />
      </>
    );
  });
});

describe("<InformationSimpleWideHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(<InformationSimpleWideHeader />);
  });
});
