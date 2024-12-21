import { sampleNotices } from "@data/forum";
import { NoticeTableHeader, NoticeTableRow } from "./NoticeTableRow";
import { renderWithProviders } from "@utils/test-utils";

describe("<NoticeTableHeader />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <>
        <NoticeTableHeader />
      </>
    );
  });
});

describe("<NoticeTableRow />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <>
        <NoticeTableRow notice={sampleNotices[0]} />
      </>
    );
  });
});
