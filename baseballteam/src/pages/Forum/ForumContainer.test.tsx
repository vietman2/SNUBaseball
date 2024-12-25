import { ForumContainer } from "./ForumContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Discussions", () => ({
  DiscussionDetail: () => <div>DiscussionDetail</div>,
  DiscussionLayout: () => <div>DiscussionLayout</div>,
  DiscussionWrite: () => <div>DiscussionWrite</div>,
}));
jest.mock("./Notices", () => ({
  NoticeDetail: () => <div>NoticeDetail</div>,
  NoticeLayout: () => <div>NoticeLayout</div>,
  NoticeWrite: () => <div>NoticeWrite</div>,
}));

describe("<ForumContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<ForumContainer />);
  });
});
