import { waitFor } from "@testing-library/react";

import { MediaPreview } from "./MediaPreview";
import { sampleMedia } from "@data/archive";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<MediaPreview />", () => {
  it("renders correctly", async () => {
    renderWithProviders(
      <>
        <MediaPreview media={sampleMedia[0]} /> {/* 이미지 */}
        <MediaPreview media={sampleMedia[1]} /> {/* 동영상 길이 없음 */}
        <MediaPreview media={{ ...sampleMedia[1], length: 123 }} />{" "}
        {/* 동영상 길이 있음 (초 < 10) */}
        <MediaPreview media={{ ...sampleMedia[1], length: 234 }} />{" "}
        {/* 동영상 길이 있음 (초 > 10) */}
      </>
    );

    await waitFor(() => {
      resizeWindow(500, 500);
    });

    await waitFor(() => {
      resizeWindow(1400, 1400);
    });
  });
});
