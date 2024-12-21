import { DiscussionCard } from "./DiscussionsCard";
import { sampleDiscussions } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("<DiscussionCard />", () => {
  it("renders", () => {
    renderWithProviders(<DiscussionCard discussion={sampleDiscussions[0]} />);
  });
});
