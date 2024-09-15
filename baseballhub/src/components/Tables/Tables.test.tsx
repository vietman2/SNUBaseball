import { render } from "@testing-library/react";

import { DailyTable } from "./DailyTable";
import { MembersTable } from "./MembersTable";
import { WeeklyTable } from "./WeeklyTable";
import { sampleWeeklyData } from "@data/weekly";
import { samplePeople } from "@constants/data/people";

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

describe("<WeeklyTable />", () => {
  it("should render empty", () => {
    render(<WeeklyTable items={[]} />);
  });

  it("should render with items", () => {
    render(<WeeklyTable items={sampleWeeklyData} />);
  });
});
