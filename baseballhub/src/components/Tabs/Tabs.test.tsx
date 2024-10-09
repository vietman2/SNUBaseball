import { fireEvent, screen, waitFor } from "@testing-library/react";

import { ChipTabs } from "./ChipTabs";
import { ExpandableTab } from "./ExpandableTab";
import { Tabs } from "./Tabs";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.unmock("@components/Tabs");

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

describe("<ExpandableTab />", () => {
  it("should render", () => {
    renderWithProviders(
      <ExpandableTab title="Title" height="100px">
        <div>Content</div>
      </ExpandableTab>
    );

    fireEvent.click(screen.getByTestId("header"));
  });
});

describe("<Tabs />", () => {
  it("should render type 1", async () => {
    renderWithProviders(
      <Tabs tabs={["Tab1", "Tab2"]} activeTab="Tab1" setActiveTab={jest.fn()} />
    );

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(1500, 1500));

    fireEvent.click(screen.getByTestId("Tab2"));
  });
  
  it("should render type 1: small text", async () => {
    renderWithProviders(
      <Tabs tabs={["Tab1", "Tab2"]} activeTab="Tab1" setActiveTab={jest.fn()} textSize="small" />
    );
  });

  it("should render type 2", () => {
    renderWithProviders(
      <Tabs
        type={2}
        tabs={["Tab1", "Tab2"]}
        activeTab="Tab1"
        setActiveTab={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("Tab2"));
  });
});
