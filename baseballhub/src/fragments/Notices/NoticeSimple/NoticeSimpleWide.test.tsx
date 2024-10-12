import { NoticeSimpleWide, NoticeSimpleWideHeader } from "./NoticeSimpleWide";
import { sampleNotices } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("<NoticeSimpleWide />", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoticeSimpleWide notice={sampleNotices[0]} />);
  });
});

describe("<NoticeSimpleWideHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoticeSimpleWideHeader />);
  });
});
