import { fireEvent, screen, waitFor } from "@testing-library/react";

import { ExpandableTab } from "./ExpandableTab";
import { Tabs } from "./Tabs";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.unmock("@components/Tabs");

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

    await waitFor(() => {
      resizeWindow(600, 600);
    });

    fireEvent.click(screen.getByTestId("Tab2"));
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

  it("should render type 3", () => {
    renderWithProviders(
      <Tabs
        type={3}
        tabs={["Tab1", "Tab2"]}
        activeTab="Tab1"
        setActiveTab={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("Tab2"));
  });
});
