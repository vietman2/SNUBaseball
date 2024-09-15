import { render } from "@testing-library/react";

import { PostSimple } from "./PostSimple";
import { samplePosts } from "@data/forum";

describe("<PostSimple />", () => {
  it("renders without errors", () => {
    render(<PostSimple post={samplePosts[0]} />);
  });
});
