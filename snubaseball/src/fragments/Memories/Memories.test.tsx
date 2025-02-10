import { Memories } from "./Memories";
import { sampleMemories } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

describe("<Memories />", () => {
  it("renders", () => {
    renderWithProviders(<Memories memories={sampleMemories[0]} />);
  });
});
