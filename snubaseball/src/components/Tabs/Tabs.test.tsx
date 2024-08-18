import { fireEvent, render, screen } from "@testing-library/react";

import { SubTabs } from "./SubTabs";
import { EmptyTabs, Tabs } from "./Tabs";

jest.unmock("@components/Tabs");

describe("<Tabs />", () => {
  it("should render", () => {
    render(
      <Tabs
        tabs={["tab1", "tab2"]}
        selectedTab="tab1"
        setSelectedTab={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("tab-tab1"));
  });
});

describe("<SubTabs />", () => {
  it("should render", () => {
    render(
      <SubTabs
        tabs={["tab1", "tab2"]}
        selectedTab="tab1"
        setSelectedTab={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("tab-tab1"));
  });
});

describe("<EmptyTabs />", () => {
  it("should render", () => {
    render(<EmptyTabs />);
  });
});
