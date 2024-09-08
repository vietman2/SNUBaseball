import { render } from "@testing-library/react";

import { DailyTable } from "./DailyTable";
import { WeeklyTable } from "./WeeklyTable";
import { sampleWeeklyData } from "@data/weekly";

describe("<DailyTable />", () => {
  it("should render without errors", () => {
    render(<DailyTable />);
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
