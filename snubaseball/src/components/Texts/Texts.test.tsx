import { Quote } from "./Quote";
import { Subtitle } from "./Subtitle";
import { renderWithProviders } from "@utils/test-utils";

describe("<Quote />", () => {
  it("renders children", () => {
    const { getByText } = renderWithProviders(<Quote quote="Quote" />);

    expect(getByText("Quote")).toBeInTheDocument();
  });
});

describe("<Subtitle />", () => {
  it("renders children and span", () => {
    const { getByText } = renderWithProviders(
      <Subtitle>
        Subtitle
        <span>_Caption</span>
      </Subtitle>
    );

    expect(getByText("Subtitle")).toBeInTheDocument();
    expect(getByText("_Caption")).toBeInTheDocument();
  });
});
