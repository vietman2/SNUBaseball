import { PostSimple } from "./PostSimple";
import { samplePosts } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("<PostSimple />", () => {
  it("renders without errors", () => {
    renderWithProviders(<PostSimple post={samplePosts[0]} />);
  });
});
