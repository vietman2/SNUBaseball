import { ErrorPage } from "@widgets/error";
import { renderWithProviders } from "@test-utils/renderer";

describe("ErrorPage", () => {
  it("calls reset function when button is clicked", () => {
    const mockError = new Error("Test error");
    const mockReset = jest.fn();

    const { getByText } = renderWithProviders(
      <ErrorPage error={mockError} reset={mockReset} />
    );

    getByText("다시 시도").click();
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
