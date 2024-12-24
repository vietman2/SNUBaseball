import { fireEvent, screen } from "@testing-library/react";

import { CategoryTabs } from "./CategoryTabs";
import { ChipTabs } from "./ChipTabs";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Tabs");

describe("<CategoryTabs />", () => {
  it("should render", () => {
    renderWithProviders(
      <CategoryTabs
        tabs={["Tab1", "Tab2"]}
        activeTab="Tab1"
        setActiveTab={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("Tab2"));
  });
});

describe("<ChipTabs />", () => {
  it("should render", () => {
    renderWithProviders(
      <ChipTabs
        options={["Option1", "Option2"]}
        selected="Option1"
        onSelect={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Option2"));
  });
});
