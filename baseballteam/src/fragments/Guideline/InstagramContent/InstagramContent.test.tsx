import { InstagramContent } from "./InstagramContent";
import { renderWithProviders } from "@utils/test-utils";

describe("<InstagramContent />", () => {
  it("renders no video", () => {
    renderWithProviders(
      <InstagramContent
        id="test"
        thumbnail="https://via.placeholder.com/150"
        video={null}
      />
    );
  });

  it("renders video", () => {
    renderWithProviders(
      <InstagramContent
        id="test"
        thumbnail="https://via.placeholder.com/150"
        video="https://via.placeholder.com/150"
      />
    );
  });
});
