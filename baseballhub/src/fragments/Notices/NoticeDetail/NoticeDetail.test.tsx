import { NoticeDetail } from "./NoticeDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<NoticeDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoticeDetail noticeId={1} goBack={() => {}} />);
  });
});
