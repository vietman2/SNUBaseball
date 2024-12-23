import { fireEvent, screen } from "@testing-library/react";

import { CategoryTabs } from "./CategoryTabs";
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
