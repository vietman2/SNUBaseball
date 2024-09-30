import { render } from "@testing-library/react";

import { DailyTable } from "./DailyTable";
import { MembersTable } from "./MembersTable";
import { samplePeople } from "@data/user/people";

jest.unmock("@components/Tables");

describe("<DailyTable />", () => {
  it("should render without errors", () => {
    render(<DailyTable />);
  });
});

describe("<MembersTable />", () => {
  it("should render empty", () => {
    render(<MembersTable members={[]} />);
  });

  it("should render with items", () => {
    render(<MembersTable members={samplePeople} />);
  });
});
