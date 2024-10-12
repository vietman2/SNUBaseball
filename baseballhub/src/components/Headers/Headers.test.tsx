import { MobileHeader, PageHeader } from "./PageHeader";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Headers");

describe("<PageHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(<PageHeader title="title" tabs={["tab1", "tab2"]} selectedTab="tab1" setSelectedTab={jest.fn()} />);
  });
});

describe("<MobileHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <MobileHeader
        tabs={["tab1", "tab2"]}
        selectedTab="tab1"
        setSelectedTab={jest.fn()}
      />
    );
  });
});
