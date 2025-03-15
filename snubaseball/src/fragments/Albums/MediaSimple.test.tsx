import { waitFor } from "@testing-library/react";

import { MediaSimple } from "./MediaSimple";
import { sampleMedia } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

describe("<MediaSimple />", () => {
  it("renders", async () => {
    renderWithProviders(
      <>
        <MediaSimple media={sampleMedia[0]} />
        {/* length is given, and remainder is less than 10 */}
        <MediaSimple media={sampleMedia[1]} />
        {/* length is given, and remainder is more than 10 */}
        <MediaSimple media={{ ...sampleMedia[1], length: 135 }} />
        {/* length is not given */}
        <MediaSimple media={{ ...sampleMedia[0], type: "비디오" }} />
      </>
    );

    await waitFor(() => {
      window.innerWidth = 1920;
      window.innerHeight = 800;
      window.dispatchEvent(new Event("resize"));
    }); // Resize window to desktop size

    await waitFor(() => {
      window.innerWidth = 1200;
      window.innerHeight = 800;
      window.dispatchEvent(new Event("resize"));
    }); // Resize window to tablet size

    await waitFor(() => {
      window.innerWidth = 600;
      window.innerHeight = 600;
      window.dispatchEvent(new Event("resize"));
    }); // Resize window to mobile size
  });
});
