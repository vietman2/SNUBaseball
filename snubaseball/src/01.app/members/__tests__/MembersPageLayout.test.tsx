import { MembersPageLayout } from "@app/members";
import { renderWithProviders } from "@test-utils/renderer";

describe("MembersPageLayout", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should render correctly", async () => {
    jest.setSystemTime(new Date("2025-01-01")); // Set date to 1st semester
    const { container } = renderWithProviders(
      <MembersPageLayout>Test</MembersPageLayout>
    );

    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent("Test");
  });

  it("should handle 2nd semester correctly", async () => {
    jest.setSystemTime(new Date("2025-10-01")); // Set date to 2nd semester
    const { getByText } = renderWithProviders(
      <MembersPageLayout>Test</MembersPageLayout>
    );

    expect(getByText("2025-2 서울대 야구부")).toBeInTheDocument();
  });
});
