import { waitFor } from "@testing-library/react";

import { MediaSimple } from "./MediaSimple";
import { sampleMedia } from "@data/archive";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<MediaSimple />", () => {
  it("renders correctly", async () => {
    renderWithProviders(
      <>
        <MediaSimple media={sampleMedia[0]} /> {/* 이미지 */}
        <MediaSimple media={sampleMedia[1]} /> {/* 동영상 길이 없음 */}
        <MediaSimple media={{ ...sampleMedia[1], length: 123 }} />{" "}
        {/* 동영상 길이 있음 (초 < 10) */}
        <MediaSimple media={{ ...sampleMedia[1], length: 234 }} />{" "}
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
