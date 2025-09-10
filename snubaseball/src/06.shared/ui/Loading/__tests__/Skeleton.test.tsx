import { Skeleton } from "@shared/ui/Loading";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Loading");

describe("Skeleton", () => {
  it("renders the default skeleton component", () => {
    const { getByTestId } = renderWithProviders(<Skeleton />);

    expect(getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders skeleton with custom width, height, and border radius (strings)", () => {
    const { getByTestId } = renderWithProviders(
      <Skeleton width="200px" height="100px" borderRadius="8px" />
    );

    const skeleton = getByTestId("skeleton");
    expect(skeleton).toHaveStyle("width: 200px");
    expect(skeleton).toHaveStyle("height: 100px");
  });

  it("renders skeleton with custom width, height, and border radius (numbers)", () => {
    const { getByTestId } = renderWithProviders(
      <Skeleton width={200} height={100} borderRadius={8} />
    );

    const skeleton = getByTestId("skeleton");
    expect(skeleton).toHaveStyle("width: 200px");
    expect(skeleton).toHaveStyle("height: 100px");
  });

  it("does not render skeleton if width or height is zero", () => {
    const { queryByTestId } = renderWithProviders(
      <Skeleton width={0} height={100} />
    );
    expect(queryByTestId("skeleton")).not.toBeInTheDocument();

    const { queryByTestId: queryByTestId2 } = renderWithProviders(
      <Skeleton width={200} height={0} />
    );
    expect(queryByTestId2("skeleton")).not.toBeInTheDocument();
  });
});
