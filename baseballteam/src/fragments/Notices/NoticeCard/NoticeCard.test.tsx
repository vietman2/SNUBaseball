import { NoticeCard } from "./NoticeCard";
import { sampleNotices } from "@data/forum";
import { renderWithProviders } from "@utils/test-utils";

describe("NoticeCard", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoticeCard notice={sampleNotices[0]} />);
  });
});
