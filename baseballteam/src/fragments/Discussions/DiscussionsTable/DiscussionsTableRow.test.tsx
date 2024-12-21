import {
  DiscussionsTableHeader,
  DiscussionsTableRow,
} from "./DiscussionsTableRow";
import { sampleDiscussions } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("<DiscussionsTableHeader />", () => {
  it("should render", () => {
    renderWithProviders(<DiscussionsTableHeader />);
  });
});

describe("<DiscussionsTableRow />", () => {
  it("should render", () => {
    renderWithProviders(
      <DiscussionsTableRow discussion={sampleDiscussions[0]} />
    );
  });
});
