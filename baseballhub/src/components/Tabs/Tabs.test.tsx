import { fireEvent, render, screen } from "@testing-library/react";

import { ExpandableTab } from "./ExpandableTab";
import { Tabs } from "./Tabs";

jest.unmock("@components/Tabs");

describe("<ExpandableTab />", () => {
  it("should render", () => {
    render(
      <ExpandableTab title="Title" height="100px">
        <div>Content</div>
      </ExpandableTab>
    );

    fireEvent.click(screen.getByTestId("header"));
  });
});

describe("<Tabs />", () => {
  it("should render", () => {
    render(
      <Tabs tabs={["Tab1", "Tab2"]} activeTab="Tab1" setActiveTab={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("Tab2"));
  });
});
